import { ReactNode } from 'react';
import { css } from '@emotion/react';

import Flex from './Flex';
import Text from './Text';

type Props = {
  as?: 'div' | 'li';
  left?: ReactNode;
  contents: ReactNode;
  right?: ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
};

export default function ListRow({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
}: Props) {
  return (
    <Flex align="center" as={as} onClick={onClick} css={listRowContainerStyles}>
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex css={listRowArrowStyles}>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  );
}

const listRowContainerStyles = css`
  padding: 8px 24px;
  cursor: pointer;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;

const listRowContentsStyles = css`
  flex: 1;
`;

const listRowArrowStyles = css`
  margin-right: 4px;
`;

type ListRowTextsProps = {
  title: string;
  subTitle: string;
};

function ListRowTexts({ title, subTitle }: ListRowTextsProps) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}

ListRow.Texts = ListRowTexts;

function IconArrowRight() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  );
}
