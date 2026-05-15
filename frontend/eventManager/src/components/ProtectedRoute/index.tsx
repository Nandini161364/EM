import { Navigate } from 'react-router-dom'
import { type ProtectedRouteProps } from '../../types/protected-route'
import { observer } from 'mobx-react-lite'
import authStore from '../../stores/authstore'

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
})

export default ProtectedRoute;
