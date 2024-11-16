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