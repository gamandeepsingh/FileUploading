const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB =async ()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL)
        console.log("Connection to DATABASE is Successfully");
    } catch (err) {
        console.log(err);
        console.log("DB not Connected");
        process.exit(1)
    }
}
