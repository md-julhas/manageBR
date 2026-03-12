import createHttpError from "http-errors"
import jwt from "jsonwebtoken"

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      throw createHttpError(401, "Access token not found, Please login.")
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
    if (!decoded) {
      throw createHttpError(401, "Inavild access token. Please login again")
    }
    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}

const isLoggedOut = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
      if (decoded) {
        throw createHttpError(400, "Already logged in.")
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

const isEmployee = (req, res, next) => {
  try {
    if (req.user.role !== "employee") {
      throw createHttpError(
        403,
        "You need an employee account to access these resources"
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}
const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw createHttpError(
        403,
        "You need an admin account to access these resources"
      )
    }
    next()
  } catch (error) {
    next(error)
  }
}
const isVerified = (req, res, next) => {
  try {
    if (!req.user.isVerified) {
      throw createHttpError(403, "User is not verified")
    }
    next()
  } catch (error) {
    next(error)
  }
}

export { isLoggedIn, isLoggedOut, isEmployee, isAdmin, isVerified }
