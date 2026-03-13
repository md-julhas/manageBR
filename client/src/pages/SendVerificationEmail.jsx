import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import api from "../api/axios"

const SendVerificationEmail = () => {
  const location = useLocation()
  const email = location.state.email
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0) // cooldown in seconds

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleSendCode = async () => {
    setLoading(true)
    try {
      const res = await api.post("/auth/send-verification-email", { email })
      toast.success(res.data.message)
      setCooldown(30) // set cooldown (e.g., 30 seconds)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Verify Your Email</h1>

      <button
        onClick={handleSendCode}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || cooldown > 0} // disable if loading or cooldown active
      >
        {loading
          ? "Sending..."
          : cooldown > 0
          ? `Please wait ${cooldown}s`
          : "Send Verification Code"}
      </button>
    </div>
  )
}

export default SendVerificationEmail
