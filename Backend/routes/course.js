const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const Course=require('../controller/courses')

// Test GET route for /courses
// Route to get popular courses
router.get('/landing', Course.getPopularCourses);
router.post('/find', Course.FindCourse);
router.get('/download/:materialId', Course.downloadMaterial);

router.get('/program/:program', (req, res) => {
    const { program } = req.params; // Extract 'id' from the URL parameter
    Course.getCourseByProgram(program, res); // Pass 'id' and 'res' to the controller
})
router.get('/materials', Course.getMaterialByType)

// Fet Course by Course_ID
router.get('/', Course.getCourse);
router.get('/:id', (req, res) => {
    const { id } = req.params; // Extract 'id' from the URL parameter
    Course.getCourseByID(id, res); // Pass 'id' and 'res' to the controller
});

module.exports = router;
