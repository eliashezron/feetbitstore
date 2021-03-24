import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
dotenv.config();
// ml_default
const cloud = cloudinary.v2;
//  
cloud.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadRoute = async(req, res=>{
   try{
       const fileStr = req.body.data;
       const UploadResponse = await cloudinary.uploader.upload(fileStr,{
           upload_preset:'ml_default'
       })
   }catch(err){
       console.log(err)
       res.status(500).json({err : 'something went wrong'})
   }
})
export default uploadRoute
// const storage = new CloudinaryStorage({
//   cloudinary: cloud,
//   params: {
//       folder: 'folder_name', // any desirable name
//       public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`,
//   },
// });

// function checkFileType(file, cb) {
// const filetypes = /jpg|jpeg|png/;
// const extname = filetypes.test(
// path.extname(file.originalname).toLocaleLowerCase()
// );
// const mimetype = filetypes.test(file.mimetype);
// if (extname && mimetype) {
// return cb(null, true);
// } else {
// cb(null, false);
// }
// }

// const upload = multer({
// storage,
// fileFilter: function (req, file, cb) {
// checkFileType(file, cb);
// },
// });

// router.post('/', upload.single('image'), (req, res) => {
// res.send(req.file.path);
// });

// export default router;