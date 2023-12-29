import { useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getCards } from '@remote/card';
import ListRow from '@shared/ListRow';

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: snapshot => snapshot.lastVisible,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (data == null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <InfiniteScroll
      dataLength={cards.length} // 현재 로드된 아이템의 개수
      hasMore={hasNextPage} // 다음 페이지가 있는지 여부
      loader={<></>} // 기다리는 동안 보여줄 컴포넌트
      next={loadMore} // 다음 페이지를 불러올 함수
      scrollThreshold="100px" // 다음 페이지를 불러올 위치
    >
      <ul>
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <div>{card.payback}</div> : null}
            withArrow
          />
        ))}
      </ul>
    </InfiniteScroll>
  );
}
