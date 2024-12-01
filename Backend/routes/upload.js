//All added by Asna
const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const Course=require('../controller/courses')
const User = require('../controller/user')
const path = require('path'); //Added by Asna

const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt']; // Add other extensions as needed
        const fileExtension = path.extname(file.originalname).toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            return cb(new Error('Unsupported file type!'), false);
        }
        cb(null, true); // Accept file
    },
});


// Upload course material
router.post("/", upload.single("file"), User.authenticateToken, Course.uploadFileController);

module.exports = upload;
module.exports = router;
