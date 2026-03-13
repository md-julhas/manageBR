import createHttpError from "http-errors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/userModel.js"
import { successReponse } from "../utils/responseHandlers.js"
import createjwtToken from "../utils/jsonwebtoken.js"
import sendEmailWithNodemailer from "../utils/sendEmailWithNodemailer.js"

// Common cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // <-- fix for dev & prod
}

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) throw createHttpError(404, "User does not exist with this email")

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) throw createHttpError(401, "Password didn't match")

    if (user.isBanned) {
      throw createHttpError(
        403,
        "Your account has been banned. Please contact the authorities.",
      )
    }

    if (!user.isVerified)
      throw createHttpError(403, "Your acccount is not verified")

    const userPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      image: user.image,
    }

    const accessToken = createjwtToken(
      userPayload,
      process.env.JWT_SECRET_KEY,
      "10m",
    )
    const refreshToken = createjwtToken(
      userPayload,
      process.env.JWT_REFRESH_KEY,
      "30d",
    )

    // Set cookies
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    }) // 10 min
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }) // 30 days

    return successReponse(res, {
      statusCode: 200,
      message: "Login successful",
      payload: userPayload,
    })
  } catch (error) {
    next(error)
  }
}

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", cookieOptions)
    res.clearCookie("refreshToken", cookieOptions)

    return successReponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
    })
  } catch (error) {
    next(error)
  }
}

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken
    if (!oldRefreshToken)
      throw createHttpError(401, "No refresh token provided!")

    const decodedToken = jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH_KEY,
    )
    const { iat, exp, ...cleanPayload } = decodedToken

    const accessToken = createjwtToken(
      cleanPayload,
      process.env.JWT_SECRET_KEY,
      "10m",
    )

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    })

    return successReponse(res, {
      statusCode: 200,
      message: "New access token generated",
    })
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(
        createHttpError(
          401,
          "Invalid or expired refresh token. Please log in again.",
        ),
      )
    }
    next(error)
  }
}

const handleSendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) throw createHttpError(404, "User not found with this email")

    if (user.isVerified) {
      return res.status(200).json({ message: "User already verified" })
    }

    const tokenPayload = { email }
    const token = createjwtToken(
      tokenPayload,
      process.env.JWT_EMAIL_VERIFY_KEY,
      "20m",
    )

    const emailData = {
      email,
      subject: "Account Activation Email From Tajir Business Hub",
      text: `Hi, ${email}\nPlease activate your account:\n${process.env.CLIENT_URL}/verify-email/${token}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body>
          <p><b>Hi, ${email}</b></p>
          <p>Click here to <a href="${process.env.CLIENT_URL}/verify-email/${token}" target="_blank">activate your account</a></p>
        </body>
        </html>
      `,
    }

    await sendEmailWithNodemailer(emailData)

    return successReponse(res, {
      statusCode: 201,
      message: "Verification email sent successfully",
      payload: { token },
    })
  } catch (error) {
    next(error)
  }
}

const handleVerifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params
    if (!token) throw createHttpError(404, "Token is required")

    const decoded = jwt.verify(token, process.env.JWT_EMAIL_VERIFY_KEY)
    const { email } = decoded
    const user = await User.findOne({ email })

    if (user.isVerified) throw createHttpError(403, "User already verified")

    user.isVerified = true
    await user.save()

    successReponse(res, {
      statusCode: 201,
      message: "User is verified successfully",
    })
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(createHttpError(401, "Invalid or expired token"))
    }
    next(error)
  }
}

export {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleSendVerificationEmail,
  handleVerifyEmail,
}
