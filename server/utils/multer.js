const multer= require('multer');
const storage= require('../storage/storage');
// const {v4:uuidv4}= require('uuid');
// const path= require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, '../../socialMedia-client/public/images'));
//     },
//     filename: function (req, file, cb) {
//       const uuid= uuidv4();
//       const extension= path.extname(file.originalname);
//       cb(null, uuid + file.fieldname + extension);
//     }
// })
  
const upload = multer({ storage: storage });

module.exports= upload;