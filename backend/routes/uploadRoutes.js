import cloud from '../utils/cloudinary.js'
const uploadRoute = async(req, res=>{
   try{
       const fileStr = req.body.data;
       const uploadResponse = await cloud.uploader.upload(fileStr,{
           upload_preset:'ml_default'
       })
       console.log(uploadResponse)
       res.json({msg:'uploaded succesfully'})
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