
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const uploadMultiImage = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        } else {
            console.log('Only jpg, jpeg and png file supported!')
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = uploadMultiImage;