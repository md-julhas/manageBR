import express from "express"

import { successReponse } from "../utils/responseHandlers.js"
import { isLoggedIn } from "../middlewares/auth.js"

const employeeRouter = express.Router()
employeeRouter.use(isLoggedIn) // only loggedin user will get access this route resources

employeeRouter.get("/dashboard", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "You have access employee dashboard panel successfully!",
  })
})

employeeRouter.get("/create-invoice", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "create invoice",
  })
})

employeeRouter.get("/add-cost", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "cost added",
  })
})

export default employeeRouter
