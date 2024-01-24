const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require('dotenv').config()

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("Docs:",doc);
    // transporter
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD,
        },
    })

    // send mail
    let info = await transporter.sendMail({
        from:`GAMANDEEP SINGH`,
        to:doc.email,
        subject:`Your File has been Uploaded on Cloudinary`,
        html:`<h2>HEllo JI!</h2> <p>File uploaded</p> view here:<a href=${doc.imageUrl}>Click Me!</a>`
    })
    console.log(info);

  } catch (err) {
    console.error(err);
  }
});

module.exports = mongoose.model("File", fileSchema);
