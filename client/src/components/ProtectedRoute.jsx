import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuthContext()

  if (loading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" replace />
  // if (!user.isVerified) return <Navigate to="/verify" replace />

  if (roles && !roles.includes(user.role))
    return <Navigate to="/not-found" replace />

  return <Outlet />
}

export default ProtectedRoute
