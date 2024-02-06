import { css } from '@emotion/react'

import Flex from './Flex'
import Text from './Text'

type Props = {
  title: string
  subTitle: string
}

export default function Top({ title, subTitle }: Props) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`
