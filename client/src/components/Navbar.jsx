import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function Navbar() {
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
      setUser(null)
      navigate("/login")
    } catch (err) {
      alert("Logout failed")
    }
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div
        className="font-bold text-lg cursor-pointer"
        onClick={() => {
          if (user?.role === "admin") navigate("/admin/dashboard")
          else if (user?.role === "employee") navigate("/employee/dashboard")
          else navigate("/")
        }}
      >
        Dashboard App
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  )
}
