import createHttpError from "http-errors"
import bcrypt from "bcryptjs"

import { streamUpload } from "../utils/cloudinaryStreamUpload.js"
import { successReponse } from "../utils/responseHandlers.js"
import User from "../models/userModel.js"

const processRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gender,
      dateOfBirth,
      bio,
      phone,
      address,
    } = req.body

    const existingUser = await User.exists({ email: email })
    if (existingUser) {
      throw createHttpError(409, "Email already exists")
    }

    // If admin user upload image
    let imageUrl
    let imageID
    if (req.file?.buffer) {
      if (req.file.buffer.length > 1 * 1024 * 1024) {
        throw createHttpError(400, "User image have to be less than 1MB")
      }
      try {
        const uploadResult = await streamUpload(
          req.file.buffer,
          "manageBR/users",
        )
        imageUrl = uploadResult.secure_url
        imageID = uploadResult.public_id
      } catch (error) {
        throw createHttpError(500, "Failed to upload image")
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user object
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      cloudinaryId: imageID,
      role,
      gender,
      dateOfBirth,
      bio,
      phone,
      address,
    })

    return successReponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      payload: newUser,
    })
  } catch (error) {
    next(error)
  }
}

export { processRegister }
