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