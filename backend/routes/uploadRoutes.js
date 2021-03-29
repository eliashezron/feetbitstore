import express from 'express'
const router = express.Router()
import { uploader} from './config/cloudinaryConfig.js'
import { multerUploads, dataUri} from './middleware/multer.js';

router.post('/', multerUploads, (req, res) => {
if(req.file) {
const file = dataUri(req).content;
return uploader.upload(file).then((result) => {
const image = result.url;
return res.status(200).json({
messge: 'Your image has been uploded successfully to cloudinary',
data: {
image
}
})
}).catch((err) => res.status(400).json({
messge: 'someting went wrong while processing your request',
data: {
err
}
}))
}
});
export default router;
// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cloudinary from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import { uploader} from './config/cloudinaryConfig.js'
// import { multerUploads, dataUri} from './middleware/multer.js';
// dotenv.config();

// const cloud = cloudinary.v2;
// const router = express.Router();

// cloud.config({
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,
// });

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