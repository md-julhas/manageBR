import express from "express"

import { processRegister } from "../controllers/userController.js"
import { userValidationRules } from "../validators/validationRules.js"
import runValidation from "../validators/validationRequest.js"
import upload from "../utils/multerUpload.js"
import { isLoggedIn, isAdmin } from "../middlewares/auth.js"

const userRouter = express.Router()

// Create a new user account, Only accessible by logged-in users with admin privileges.
userRouter.post(
  "/register",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  userValidationRules,
  runValidation,
  processRegister,
)

export default userRouter
