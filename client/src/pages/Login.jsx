import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"

import { inputStyle, labelStyle } from "../styles"
import api from "../api/axios"
import { useAuthContext } from "../context/AuthContext"
import logo from "../assets/logo.png"

const Login = () => {
  const [email, setEmail] = useState("julhas.info@gmail.com")
  const [password, setPassword] = useState("ddddddddU2%")
  const [showPassword, setShowPassword] = useState(false)

  const { setUser } = useAuthContext()
  const navigate = useNavigate()

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
      if (errMsg.includes("banned")) {
        navigate("/banned")
      } else if (errMsg.includes("not verified")) {
        navigate("/send-verification-email", { state: { email } })
      } else {
        toast.error(errMsg)
      }
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
            alt="restaurants app"
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
        </form>
      </div>
    </div>
  )
}

export default Login
