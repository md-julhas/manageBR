import React, { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

const VerifyEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState("Verifying...")
  const [showLoginButton, setShowLoginButton] = useState(false)
  const calledOnce = useRef(false)

  const sendVerifyRequest = async () => {
    if (calledOnce.current) return
    calledOnce.current = true

    try {
      const res = await api.get(`/auth/verify-email/${token}`)
      const { success, message } = res.data
      setMessage(message)

      if (success || message === "User already verified") {
        setShowLoginButton(true)
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong"
      setMessage(msg)

      if (msg === "User already verified") {
        setShowLoginButton(true)
      }
    }
  }

  useEffect(() => {
    sendVerifyRequest()
  }, [token])

  const handleGoToLogin = () => {
    navigate("/login")
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>

      {showLoginButton && (
        <button
          onClick={handleGoToLogin}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#0d6efd",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      )}
    </div>
  )
}

export default VerifyEmail
