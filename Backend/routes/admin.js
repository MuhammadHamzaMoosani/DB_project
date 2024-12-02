const express = require("express");
const Course = require("../controller/courses");
const User = require("../controller/user");
const router = express.Router();

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

router.get('/', User.getUsers);
router.post('/login', User.loginUser);
router.post('/otp', User.otpCheck)
router.post('loginCheck', User.active_user)
router.post('checkOtpExit', User.checkOtpExit)
router.post('logOut', User.logOut)
router.post('/signUp', User.signUp)
router.delete('/delete', User.deleteUser);
router.post("/courses", User.authenticateToken, User.isAdmin, Course.createCourse);
router.delete("/courses/:id", User.authenticateToken, User.isAdmin, Course.deleteCourse);
router.post("/courses/:id/outline", upload.single("file"), User.authenticateToken, User.isAdmin, Course.uploadCourseOutline);

module.exports = router;