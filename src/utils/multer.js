// middlewares/upload.js
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "ecommerce-uploads", // Folder name in Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     public_id: (req, file) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       return file.fieldname + "-" + uniqueSuffix;
//     },
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});



const upload = multer({ 
  storage: storage,

  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
