import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { getAdBanners } from '@remote/adBanner'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import 'swiper/css'

export default function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanners())

  /* Skeleton UI */
  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map(({ id, link, title, description }) => (
          <SwiperSlide key={id}>
            <Link to={link}>
              <Flex direction="column" css={bannerContainerStyles}>
                <Text bold>{title}</Text>
                <Text typography="t7">{description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
