import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { inputStyle, labelStyle } from "../styles"
import api from "../api/axios"
import { useAuthContext } from "../context/AuthContext"
import logo from "../assets/logo.png"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useAuthContext()
  const navigate = useNavigate()

  // Demo credentials
  const demoUser = {
    email: "julhas.info@gmail.com",
    password: "ddddddddU2%",
  }

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/login", { email, password })

      setUser(res.data.payload)
      navigate("/employee/dashboard")
      toast.success(res.data.message)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      if (errMsg?.includes("banned")) {
        navigate("/banned")
      } else if (errMsg?.includes("not verified")) {
        navigate("/send-verification-email", { state: { email } })
      }
    }
  }

  // One-click demo login
  const handleDemoLogin = async () => {
    try {
      const res = await api.post("/auth/login", demoUser)
      setUser(res.data.payload)
      navigate("/employee/dashboard")
      toast.success("Logged in as Demo User")
    } catch (err) {
      toast.error("Demo login failed")
    }
  }

  return (
    <div className="container-box h-screen items-center bg-gray-200">
      <div className="w-full max-w-md bg-white p-10 rounded-md box-shadow-strong">
        <Helmet>
          <title>Login | Tazir Business Management</title>
        </Helmet>

        {/* Brand logo and name */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <img
            src={logo}
            alt="Tazir logo"
            className="h-10 p-1.5 bg-themeColor rounded-full"
          />
          <b className="text-3xl">Tazir</b>
        </div>
        <h1 className="text-xl font-bold text-center">
          Welcome to the Tazir Business Hub
        </h1>

        <p className="text-center text-gray-400 py-5">
          Access restricted to authorized employees and administrators only.
        </p>
        <h2 className="font-bold text-center text-gray-500 mb-5">
          Authorized Personnel Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              className={inputStyle}
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={labelStyle}>Email</label>
          </div>

          <div className="relative">
            <input
              className={`${inputStyle} pr-10`}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={labelStyle}>Password</label>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-themeColor transition"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-themeColor text-gray-100 py-3 rounded-lg hover:opacity-90"
          >
            Login
          </button>

          {/* Demo login button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full border border-themeColor text-themeColor py-3 rounded-lg hover:bg-themeColor hover:text-white transition"
          >
            Login as Demo User
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
