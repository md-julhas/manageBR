import "dotenv/config"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import createHttpError from "http-errors"
import helmet from "helmet"
import cookiesParser from "cookie-parser"
import rateLimit from "express-rate-limit"

import { errorResponse, successReponse } from "./utils/responseHandlers.js"
import productRouter from "./routes/productRouter.js"
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import adminRouter from "./routes/adminRouter.js"
import employeeRouter from "./routes/employeeRouter.js"

const app = express()

// app.set("trust proxy", 2)
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  message: "To many req from this IP, please try again later",
})

app.use(limiter)

// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cookiesParser())

// Test route
app.get("/test", (req, res) => {
  successReponse(res, {
    statusCode: 201,
    message: "Test route API is working properly!",
  })
})

// Routes
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.use("/api/auth", authRouter)

app.use("/api/admin", adminRouter)
app.use("/api/employee", employeeRouter)

// Handle requests to unknown routes
app.use((req, res, next) => {
  next(createHttpError(404, "Route not found!"))
})

// Error-handling middleware
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message })
})



export default app
