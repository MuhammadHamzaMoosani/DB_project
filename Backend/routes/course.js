const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const Course=require('../controller/courses')

const multer = require('multer');
const Courses=require('../models/courses')

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
// File upload route



// Test GET route for /courses
router.get('/', Course.getCourse);
// Route to get popular courses
router.get('/landing', Course.getPopularCourses);

// Get popular courses on Landing page
router.post('/upload', upload.single('file'), async (req, res) => {
    const { course_id, material_type, material_description } = req.body;
    const file = req.file;
    console.log(course_id);
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        await Courses.uploadFile(course_id, material_type, material_description, file.buffer);
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const courseID = req.params.id; // Extract Course_ID from the URL parameter
        const [rows] = await Courses.fetchCourseDetails(courseID); // Call the function to fetch details
        
        if (rows && rows.length > 0) {
            // Send the course details as response
            res.status(200).json({
                message: 'Course details fetched successfully.',
                data: rows[0] // Assuming the first row contains the course details
            });
        } else {
            // If no course is found
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'Error fetching course details', error: err.message });
    }
});


module.exports = router;
