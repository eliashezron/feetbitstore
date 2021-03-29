import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import Datauri from 'datauri';
dotenv.config();

const cloud = cloudinary.v2
const router = express.Router();

cloud.config({
cloud_name:'eliashezron',
api_key:'747215349399951',
api_secret:'J1KlU8Wf-LYuen1yW0k4mlxlyf8',
});

// const storage = new CloudinaryStorage({
// cloudinary:cloud,
// folder: "feetbitstores",
// allowedFormats: ["jpg", "png"],
// transformation: [{ width: 500, height: 500, crop: "limit" }],
// public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`
// });
// Update for datauri module:
// const DatauriParser = require("datauri/parser");
// const parser = new DatauriParser();
// for getting the string from the file buffer
// const file = parser.format(
// path.extname(req.file.originalname).toString(),
// req.file.buffer
// ).content;
// const dUri = new Datauri();
// const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
      folder: 'feetbitstores', // any desirable name
      public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`,
  },
});

function checkFileType(file, cb) {
const filetypes = /jpg|jpeg|png/;
const extname = filetypes.test(
path.extname(file.originalname).toLocaleLowerCase()
);
const mimetype = filetypes.test(file.mimetype);
if (extname && mimetype) {
return cb(null, true);
} else {
cb(null, false);
}
}

const upload = multer({
storage,
fileFilter: function (req, file, cb) {
checkFileType(file, cb);
},
});

router.post('/', upload.single('image'), (req, res) => {
     console.log(req.file)
        // const file = dataUri(req).content; 
        // return uploader.upload(file).then((result) => {
            const image = {};
            image.url = req.file.url;
            image.id = req.file.public_id;
            
            Image.create(image) // save image information in database
                .then(newImage => res.json(newImage))
                .catch(err => console.log(err));
           
        
        // })
})
     

    


export default router;


// import express from 'express'
// const router = express.Router()
// import { uploader} from './config/cloudinaryConfig.js'
// import { multerUploads, dataUri} from './middleware/multer.js';

// router.post('/', multerUploads, (req, res) => {
// if(req.file) {
// const file = dataUri(req).content;
// return uploader.upload(file).then((result) => {
// const image = result.url;
// return res.status(200).json({
// messge: 'Your image has been uploded successfully to cloudinary',
// data: {
// image
// }
// })
// }).catch((err) => res.status(400).json({
// messge: 'someting went wrong while processing your request',
// data: {
// err
// }
// }))
// }
// });
// export default router;