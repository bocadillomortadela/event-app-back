const express = require('express')
const bodyParser = require('body-parser')
const { connectDB } = require('./src/utils/db')
const { userRoutes } = require('./src/api/routes/user')
const { eventRoutes } = require('./src/api/routes/event')
const { deleteFile } = require('./src/utils/delete')
const cors = require('cors')
require('dotenv').config()

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const app = express()
app.use(express.json())
connectDB()
app.use(cors())
app.use('/api/v1/event', eventRoutes)
app.use('/api/v1/users', userRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal Server Error' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
