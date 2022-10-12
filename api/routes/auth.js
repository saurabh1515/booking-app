const express = require("express")
const router = express.Router()

const { register } = require("../controllers/auth")

router.get("/register", (req, res) => {
  res.send("Autheticating...........")
})

module.exports = router
