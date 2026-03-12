import app from "./app.js"
import connectDB from "./config/db.js"

const PORT = process.env.PORT || 9000

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectDB()
})
