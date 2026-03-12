import { validationResult } from "express-validator"

import { errorResponse } from "../utils/responseHandlers.js"

const runValidation = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return errorResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      })
    }
    next()
  } catch (err) {
    next(err)
  }
}

export default runValidation
