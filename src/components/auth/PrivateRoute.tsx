import { Navigate } from 'react-router-dom'

import useUser from '@hooks/auth/useUser'

type Props = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: Props) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}
