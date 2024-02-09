import { useMutation } from 'react-query'

import { applyCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'
import { useAlertContext } from '@contexts/AlertContext'

type Props = {
  onSuccess: () => void
  onError: () => void
}

export default function useApplyCardMutation({ onSuccess, onError }: Props) {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드를 신청하지 못했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}
