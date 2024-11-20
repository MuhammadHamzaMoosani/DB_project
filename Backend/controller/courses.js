const Course=require('../models/courses')

exports.getCourse=(req,res,next)=>
    {
      Course.fetchAll().then(
            ([courses])=>
                {
                    res.status(200).json({
                        success: true,
                        Courses: courses // The rows from the database query
                    })
                })
            .catch(err=>
                {
                    console.error(err);
                    res.status(401).json(
                        {
                            success:false,
                            message:err
                        })
                })
    }

exports.getPopularCourses = (req, res, next) => {
    Course.updatePopularityScores().then(() => {
            return Course.fetchTopCourses(); // Fetch after updating scores
        })
        .then(([courses]) => {
            console.log("Fetched Courses:", courses); // Debugging: Check what the database is returning
            res.status(200).json({
                success: true,
                Courses: courses, // Corrected: No extra array wrapping
            });
        })
        .catch(err => {
            console.error("Error in getPopularCourses:", err);
            res.status(401).json({
                success: false,
                message: err.message,
            });
        });
};

exports.uploadFileController = (req, res, next) => {
    const { course_id, material_type, material_description } = req.body;
    const file = req.file;
    // Check if the file exists
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

     // Call the model function to save file details
     Course.uploadFile(course_id, material_type, material_description, file.buffer).then(() => {
         // Send success response
         res.status(200).json({ message: 'File uploaded successfully' });
     })
     .catch((error) => {
         console.error('Error uploading file:', error);

         // Handle specific or generic errors
         if (error.code === 'ER_BAD_FIELD_ERROR') {
             return res.status(400).json({ message: 'Invalid input or database field mismatch' });
         }

         res.status(500).json({ message: 'Internal Server Error' });
     });
}

// Get course by id
exports.getCourseByID = (courseID, res) => {

    Course.fetchCourseDetails(courseID)
    .then(([rows]) => {
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
    })
    .catch((err) => {
        // Handle errors
        res.status(500).json({ message: 'Error fetching course details', error: err.message });
    });
}