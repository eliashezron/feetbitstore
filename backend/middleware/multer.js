import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();

// * @description This function converts the buffer to data url
// * @param {Object} req containing the field object
// * @returns {String} The data url from the string buffer

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
export { multerUploads, dataUri };

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
// })