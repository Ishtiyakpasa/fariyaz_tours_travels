const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '<%= baseUrl %>/assets/images/documents'); // Destination folder for storing files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

// File filter to accept only certain file types (e.g., images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
