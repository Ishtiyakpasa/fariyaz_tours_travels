const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = 'public/assets/images/thumbnails';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Extract the file extension
    const fileName = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, fileName); // Call the callback with the generated file name
    req.fileName = fileName; // Set the fileName property on the request object
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
