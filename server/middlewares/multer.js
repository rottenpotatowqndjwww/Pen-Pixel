//! we use multer for parsing image


 import multer from 'multer'
 
 const upload = multer({storage: multer.diskStorage({})})

 export default upload