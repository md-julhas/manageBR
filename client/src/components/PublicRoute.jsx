import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export default function PublicRoute({ children }) {
  const { user, loading } = useAuthContext()

  if (loading) return <p className="text-center mt-20">Loading...</p>

  if (user) return <Navigate to={`/employee/dashboard`} />

  return children
}
