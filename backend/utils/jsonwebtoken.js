import createHttpError from "http-errors"
import jwt from "jsonwebtoken"

const createjwtToken = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw createHttpError(400, "Payload must be an object and not empty")
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    throw createHttpError(500, "Secret key must be a string and not empty")
  }
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn })
    return token
  } catch (error) {
    console.error("Failed to sign jwt", error)
    throw error
  }
}

export default createjwtToken
