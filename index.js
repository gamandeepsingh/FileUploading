const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000;
app.use(express.json())

// FileUpload (uploading media on server not on the cloudinary , Cloudinary stores file in Cloud from the Server)
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


// DB Connect
const DB = require("./config/database")
DB.connectDB()

// Cloud Connect
const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

// routes
const upload = require("./routes/FileUpload")
app.use("/api/v1",upload)

// Server initiative
app.listen(PORT , ()=>console.log(`Server Started at ${PORT}`))
