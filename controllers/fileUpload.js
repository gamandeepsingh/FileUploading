const File = require("../models/file")
const cloudinary = require('cloudinary').v2;
exports.localFileUpload = async (req,res)=>{
    try {
        // fetch file
        const file = req.files.file; // last "file" is the the name of the key given(u may use anything)
        console.log("FILE: ",file);

        // at what path to store file in local
        let path = __dirname +"/files/" + Date.now() +`.${file.name.split('.')[1]}`; //extension
        console.log("path:",path);

        // add path to move function
        file.mv(path ,(err) => console.log(err));

        // create a successful response
        res.json({
            success:true,
            message:"File uploaded on Local Successfully"
        })

    } catch (err) {
        console.log(err);
        res.json({
            success:false,
            message:"File uploaded on Local Unsuccessfully:",
            error:err
        })
    }
}

function isFileTypeSupported(type , supportedTypes ){
    return supportedTypes.includes(type)

}
async function uploadImgToCloudinary(file,folder){
    const options ={folder }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
async function uploadvideoToCloudinary(file,folder){
    const options ={folder , resource_type: "video", }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}


exports.imageUpload = async(req,res)=>{
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name , tags,email);

        const file = req.files.imgFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg" , "png"]
        const fileType = file.name.split(".")[1].toLowerCase();

        // file format if not supported
        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.json({
                success:false,
                message:"File format not supported"
            })
        }
        console.log("file format supported");
        if((file.size/(Math.pow(1024,2)))>= 5){
            return res.json({
                success:false,
                message:"File Size Exceeds >5mb"
            })
        }
        // file format supported
        const response = await uploadImgToCloudinary(file,"fileUpload");
        console.log(response);
        
        // Entry  in the DataBase
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"File uploaded Successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Img not upload on Cloudinary",
            error:err
        })
    }
}

exports.videoUpload = async (req,res)=>{
    try {
        // data fetch
        const {name,email,tags}= req.body;
        const video = req.files.videoUpload;
        console.log(name,email,tags,video);

        // validate
        const supportedTypes = ["mp4","mov"]
        const videoType = video.name.split(".")[1];
        console.log(videoType);

        // VALIDATE VIDEO
        if(!isFileTypeSupported(videoType,supportedTypes)){
            return res.json({
                success:false,
                message:"Video File Format is not Supported"
            })
        }
        // console.log(video.size/(1024*1024));
        if((video.size/(1024*1024)) >= 5){
            return res.json({
                success:false,
                message:"File Size Exceeds >5mb"
            })
        }

        //cloudinary upload
        const response = await uploadvideoToCloudinary(video,"fileUpload");
        console.log(response);

        // db save
        const data = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })

        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"File uploaded Successfully"
        })

        
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Video not uploaded on cloudinary",
            error:err
        })
    }
}