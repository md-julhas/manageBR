import express from "express"
import rateLimit from "express-rate-limit"

import {
  handleRefreshToken,
  handleLogin,
  handleLogout,
  handleSendVerificationEmail,
  handleVerifyEmail,
} from "../controllers/authController.js"
import { userLoginValidatonRules } from "../validators/validationRules.js"
import runValidation from "../validators/validationRequest.js"
import { isLoggedIn, isLoggedOut } from "../middlewares/auth.js"

const authRouter = express.Router()

const sendEmailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many requests. Please try again after few moments",
})

authRouter.post(
  "/login",
  userLoginValidatonRules,
  runValidation,
  isLoggedOut,
  handleLogin
)
authRouter.post("/logout", isLoggedIn, handleLogout)
authRouter.get("/refresh-token", handleRefreshToken)

authRouter.post(
  "/send-verification-email",
  sendEmailLimiter,
  handleSendVerificationEmail
)
authRouter.get("/verify-email/:token", handleVerifyEmail)

export default authRouter
