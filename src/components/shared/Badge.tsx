import styled from '@emotion/styled'

import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'

type Props = {
  label: string
}

export default function Badge({ label }: Props) {
  return (
    <Container>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`
