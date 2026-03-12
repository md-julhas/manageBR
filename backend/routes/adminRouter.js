import express from "express"

import { successReponse } from "../utils/responseHandlers.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth.js"

const adminRouter = express.Router()
adminRouter.use(isLoggedIn, isAdmin)

adminRouter.get("/dashboard", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "You have access admin dashboard panel successfully!",
  })
})

adminRouter.get("/users", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "Ruturned users",
  })
})

adminRouter.get("/cost-data", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "Ruturned cost data",
  })
})

adminRouter.get("/profits", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "Ruturned profits",
  })
})

export default adminRouter
