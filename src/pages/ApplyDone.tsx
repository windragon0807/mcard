import { parse } from 'qs'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import FixedBottomButton from '@shared/FixedBottomButton'

export default function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      css={containerStyles}>
      <img
        src={success === 'true' ? SuccessIconUrl : FailIconUrl}
        alt="Check Icon"
        css={imageStyles}
      />
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다.'
          : '카드 발급에 실패했습니다.'}
      </Text>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

const FailIconUrl =
  'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1580549450/noticon/abi2ckq8gvbymtgimncu.png'
const SuccessIconUrl =
  'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1581488166/noticon/teg1ooxzhglorh6rk9hs.png'

const containerStyles = css`
  margin-top: 100px;
  height: 100%;
  gap: 50px;
`

const imageStyles = css`
  width: 120px;
  height: 120px;
`
