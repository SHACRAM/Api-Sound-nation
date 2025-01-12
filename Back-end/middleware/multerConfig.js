const multer = require('multer');
const path = require('path');

// Types MIME autorisés
const mimeTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); 
        const extension = mimeTypes[file.mimetype];
        callback(null, `${name}_${Date.now()}.${extension}`);
    },
});

module.exports = multer({ storage: storage });
