import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { auth } from '@remote/firebase'
import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { useAlertContext } from '@contexts/AlertContext'

export default function SigninPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        // Firebase 로그인
        await signInWithEmailAndPassword(auth, email, password)

        navigate('/')
      } catch (e) {
        // Firebase 에러
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {
                //
              },
            })

            return
          }
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            //
          },
        })
      }
    },
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
