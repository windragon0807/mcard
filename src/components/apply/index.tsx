import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'

type Props = {
  onSubmit: (applyValues: ApplyValues) => void
}

export default function Apply({ onSubmit }: Props) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const storageKey = `applied-${user?.uid}-${id}`
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues(prevValues => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues(prevValues => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues(prevValues => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}
