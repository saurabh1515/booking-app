const express = require("express")
const app = express()

const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const hotelsRoute = require("./routes/hotels")
const roomsRoute = require("./routes/rooms")
const usersRoute = require("./routes/users")
require("dotenv").config()
const PORT = 3000

//establish databse connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database.")
  } catch (error) {
    console.log(error)
  }
}

//middleware
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  })
})

// start the server
app.listen(PORT, () => {
  connectDB()
  console.log("Server is running.")
})
