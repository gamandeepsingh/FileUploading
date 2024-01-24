const cloudinary = require('cloudinary');

exports.cloudinaryConnect = () =>{
    try {
        cloudinary.v2.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })
    } catch (err) {
        console.log("Error in Cloudinary",err);
    }
}

// cloudinary->access Keys -> to get keys details