const Course=require('../models/courses')
const path = require('path'); //Added by Asna
const fs = require('fs'); //Added by Asna
const mime = require('mime-types'); // To determine MIME type from file extensions

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
exports.setApprove=(req,res,next)=>
    {
        let id=req.body.id
        let status=req.body.status
        Course.setApprove(status,id).then
        (
            ([material])=>
                {
                    res.status(200).json({
                        success: true,
                        approved:true
                        // material: material // The rows from the database query
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
exports.getUnapproved=(req,res,next)=>
    {
        Course.GetApprove().then
        (
            ([material])=>
                {
                    res.status(200).json({
                        success: true,
                        material: material // The rows from the database query
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
exports.FindCourse=(req,res,next)=>
{
    courseName=req.body.courseName
    Course.find(courseName).then(
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
    console.log(material_description+","+material_type+","+course_id+"")
    // Check if the file exists
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const originalFileName = req.file.originalname; // The original name of the uploaded file
    const fileExtension = path.extname(originalFileName); // Extract file extension (e.g., .pdf, .docx)

    const Material_description = material_description || `${originalFileName}${fileExtension}`;
     // Call the model function to save file details
     Course.uploadFile(course_id, material_type, Material_description, file.buffer).then(() => {
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

//Added by Asna
exports.downloadMaterial = async (req, res) => {
    try {
        const materialId = req.params.materialId;
        console.log('Material ID:', req.params.materialId);

        // Fetch material from the database
        const material = await Course.downloadFile(materialId);

        if (!material || !material.Material_File) {
            return res.status(404).json({ success: false, message: 'Material not found' });
        }
        console.log(material.Material_Description)
        // Ensure Material_Description exists
        const fileDescription = material.Material_Description || 'default.txt';
        const fileBuffer = Buffer.from(material.Material_File, 'binary');
        const fileExtension = path.extname(fileDescription) || '.bin'; // Default to .bin if no extension

        // Set response headers to force file download
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileDescription}"`
        );
        res.setHeader('Content-Type', 'application/pdf');
        res.end(fileBuffer);

        // Send the binary file
        //res.send(Buffer.from(material.Material_File));
    } catch (error) {
        console.error('Error during file download:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//Added by Asna

exports.createCourse = async (req, res) => {
    
    const { Course_Code, Course_name, Course_type, Program, Semester_Year, Course_description, Course_Status, School,image } = req.body;
    console.log(req.body)
    const file = req.file;
    console.log(req.file)
    // Check if the file exists
    if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
    }
    const filel = file.buffer;
    // Call the model function to save file details
    const course = new Course(
        Course_Code, Course_name, Course_type, Program, Semester_Year, Course_description, filel , Course_Status, image, School);
    course.save()
    .then(([response])=>
        {
            res.status(200).json(
                {
                    success:true,
                    message:"Course Added",
                    data: course
                })
        })
    .catch((err)=>
        {
            console.log(err)
            res.status(401).json(
                {
                    success:false,
                    messsage:"Error creating course."
                })
        });
};

exports.deleteCourse = async (req, res) => {
try {
    const { id } = req.params;
    const course = await Course.findByID(id);
    if (!course) {
        return res.status(404).json({ success: false, message: "Course not found." });
    }

    await course.delete(id);
    res.status(200).json({ success: true, message: "Course deleted." });
} catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ success: false, message: "Error deleting course." });
}
};

// Upload a course outline
exports.uploadCourseOutline = async (req, res) => {
const { course_id } = req.body;
const file = req.file;
// Check if the file exists
if (!file) {
return res.status(400).json({ message: 'No file uploaded' });
}

const originalFileName = req.file.originalname; // The original name of the uploaded file
const fileExtension = path.extname(originalFileName); // Extract file extension (e.g., .pdf, .docx)

const Material_description = Material_description || `${originalFileName}${fileExtension}`;
// Call the model function to save file details

Course.uploadFile(course_id, file.buffer).then(() => {
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
};

exports.getMaterialByType = async (req, res) => {
    try {
        const id = req.body.id;
        const type = req.body.type;
        const materials = await Course.fetchCourseMaterial(id, type);
        console.log(materials[0])
        
        res.status(200).json({
            success: true,
            materials:materials[0],
        });
    } 
    catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses.",
            error: error.message,
        });
    }
}
exports.getCourseByProgram = (req, res) => {
    const program = req.params.program;
    Course.fetchCoursebyProgram(program).then(([rows]) => {
        if (rows && rows.length > 0) {
            // Send the course details as response
            res.status(200).json({
                message: 'Courses by program fetched successfully.',
                Courses: rows[0] // Assuming the first row contains the course details
            });
        } else {
            // If no course is found
            res.status(404).json({ message: 'Course not found' });
        }
        
    })
    .catch((err) => {
        // Handle errors
        res.status(500).json({ message: 'Error fetching course by program', error: err.message });
    });
}

exports.getCourseBySemYear = (req, res) => {
    const sem_year = req.body.sem_year;
    Course.getCoursesBySemesterYear(sem_year).then((rows) => {
        if (rows && rows.length > 0) {
            // Send the course details as response
            res.status(200).json({
                message: 'Courses by Semester_Year fetched successfully.',
                Courses: rows[0] // Assuming the first row contains the course details
            });
        } else {
            // If no course is found
            res.status(404).json({ message: 'Course not found' });
        }
        
    })
    .catch((err) => {
        // Handle errors
        res.status(500).json({ message: 'Error fetching course by Semester_Year', error: err.message });
    });
}

exports.getCourseByTopic = async (req, res) => {
    const topic = req.body.topic;
    const topicArray = topic.split(',').map(topic => topic.trim().toLowerCase());
    console.log("Topics array:", topicArray); // Log the array of topics
    Course.getCoursesByTopic(topicArray).then((rows) => {
        if (rows && rows.length > 0) {
            // Send the course details as response
            res.status(200).json({
                message: 'Courses by topic fetched successfully.',
                Courses: rows[0] // Assuming the first row contains the course details
            });
        } else {
            // If no course is found
            res.status(404).json({ message: 'Course not found' });
        }
        
    })
    .catch((err) => {
        // Handle errors
        res.status(500).json({ message: 'Error fetching course by topic', error: err.message });
    });
}
