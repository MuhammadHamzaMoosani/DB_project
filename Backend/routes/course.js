const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const Course=require('../controller/courses')

const multer = require('multer');
const Courses=require('../models/courses')

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Test GET route for /courses
router.get('/', Course.getCourse);
// Route to get popular courses
router.get('/landing', Course.getPopularCourses);
// Upload course material
router.post('/upload', upload.single('file'), Course.uploadFileController);
router.get('/:program', (req, res) => {
    const { program } = req.params; // Extract 'id' from the URL parameter
    Course.getCourseByProgram(program, res); // Pass 'id' and 'res' to the controller
});
// Fet Course by Course_ID
router.get('/:id', (req, res) => {
    const { id } = req.params; // Extract 'id' from the URL parameter
    Course.getCourseByID(id, res); // Pass 'id' and 'res' to the controller
});

module.exports = router;
