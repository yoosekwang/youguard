const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory for S3 upload

const fileFilter = (req, file, cb) => {
    cb(null, true); // Accept all file types
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 }, // 1024 MB file size limit
    fileFilter,
});

module.exports = upload;
