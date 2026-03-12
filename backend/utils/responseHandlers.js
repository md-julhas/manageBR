export const errorResponse = (
  res,
  { statusCode = 500, message = "Internal server error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  })
}

export const successReponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  })
}
