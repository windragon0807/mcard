import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@remote/firebase'
import { userAtom } from '@atoms/user'

type Props = {
  children: React.ReactNode
}

// Firebase Auth의 로그인 상태와 프론트엔드의 로그인 상태를 동기화하는 컴포넌트
export default function AuthGuard({ children }: Props) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // Firebase Auth의 로그인 상태가 변경될 때마다 프론트엔드의 로그인 상태를 변경
  onAuthStateChanged(auth, user => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}
