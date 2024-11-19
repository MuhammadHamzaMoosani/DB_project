const multer = require('multer');
const db=require('../util/database')

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

module.exports=class Courses
{
    constructor(Course_ID,Course_Code,Course_name,Course_type,Program,Semester_year,Course_description,Resources,Course_Status, Course_image, Views, Bookmarks, Downloads, Popularity_Score)
    {
        this.Course_ID=Course_ID;
        this.Course_Code=Course_Code;
        this.Course_name=Course_name;
        this.Course_type=Course_type;
        this.Program=Program;
        this.Semester_year=Semester_year;
        this.Course_description=Course_description;
        this.Resources=Resources;
        this.Course_Status=Course_Status;
        this.Course_image=Course_image;
        this.Views=Views;
        this.Bookmarks=Bookmarks;
        this.Downloads=Downloads;
        this.Popularity_Score=Popularity_Score;

    }
    static async uploadFile(course_id, material_type, material_description, fileBuffer) {
        const sql = `
            INSERT INTO Course_Material (Course_ID, Material_Type, Material_Description, Material_File)
            VALUES (?, ?, ?, ?)
        `;
        const values = [course_id, material_type, material_description, fileBuffer];
        return db.execute(sql, values);
    }
    save()
    {
        const sql='INSERT INTO Course VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const values=[this.Course_ID,this.Course_Code,this.Course_name,this.Course_type,this.Program,this.Semester_year,this.Course_description,this.Resources,this.Course_Status, this.Views, this.Bookmarks, this.Downloads, this.Popularity_Score];
        return db.execute(sql,values)
    }
    update(User_name,User_email,User_password,User_ID)
    {
        const sql=`UPDATE Users
                    set User_name=?,User_email=?,User_password=?
                    where User_ID=?` ;
        const values=[User_name,User_email,User_password,User_ID]
        return db.execute(sql,values);
    }
    static findByEmailPassword(email,password)
    {
        const sql=`Select User_Type from Users
                    where User_email=? and User_password=?`;
        const values=[email,password]
        return db.execute(sql,values);
    }
    static fetchAll()
    {
        const sql='SELECT * from Course';
        return db.execute(sql)
    }
    static delete(id)
    {
        const sql=`Delete from Users 
                    where User_ID=?`;
        const values=[id];
        return db.execute(sql,values);
    }   
    static createTrigger()
    {
        const sql=`
                    CREATE TRIGGER logDeletedUsers
                    AFTER DELETE ON users
                    For each row
                    BEGIN
                        INSERT INTO Deleted_Users (User_ID, User_name, User_email, User_password, User_Type, deletedDate)
                        values(OLD.User_ID,OLD.User_name,OLD.User_email,OLD.User_password,OLD.User_Type,NOW());
                    END;`
        return db.query(sql);
    }
    static fetchCourseDetails(Course_ID) {
        const sql = `CALL FetchCourseDetails(?)`; // my stored procedure
        return db.execute(sql, [Course_ID]); 
    }
    static fetchCoursebyProgram(Program_name) {
        const sql = `
                    SELECT * 
                    FROM Course 
                    WHERE Program = ?; `;
        db.execute(sql, [Program_name])
        .then(([rows, fields]) => {
        console.log(rows); // The result set returned by the procedure
        })
        .catch(err => {
            console.error('Error fetching by program:', err);
        });
    }
    static async updatePopularityScores() {
        const sql = `
                    UPDATE Course
                    SET Popularity_Score = (Views * 0.5) + (Downloads * 0.3) + (Bookmarks * 0.2); `; 
        try {
            const [result] = await db.execute(sql);
            console.log("Popularity scores updated:", result);
            return result;
        } catch (err) {
            console.error("Error updating popularity scores:", err);
            throw err; // Throw the error so it propagates correctly.
        }
    }
    static async fetchTopCourses() {
        const sql = `SELECT * FROM Course ORDER BY Popularity_Score DESC LIMIT 5`;
        return db.execute(sql)
        // try {
        //     console.log
        //     const [courses] = await db.execute(sql);
        //     console.log("Fetched top courses:", courses);
        //     return courses;
        // } catch (err) {
        //     console.error("Error fetching top courses:", err);
        //     throw err;
        // }
    }
    static async fetchCourseByTopic(topics) {
        const tags = topics
        const sql = `SELECT * FROM Course WHERE JSON_OVERLAPS(topic_tags, ?)`;
        const [rows] = await db.execute(sql, [tags]);
    }

};
(async function defineTrigger() {
    try {
      await module.exports.createTrigger();
      console.log('Trigger "after_product_delete" created successfully.');
    } catch (err) {
      if (err.code === 'ER_SP_ALREADY_EXISTS') {
        // console.log('Trigger "after_product_delete" already exists.');
      } else {
        // console.error('Error creating trigger:', err);
      }
    }
  })();
//   (async function testFetchCourseDetails() {
//     try {
//       const Course_ID = 1; // Replace with a valid ID from your Course table
//       const [rows] = await db.execute(`CALL FetchCourseDetails(?)`, [Course_ID]);
//       console.log('Course Details:', rows[0]);
//     } catch (err) {
//       console.error('Error calling procedure:', err.message);
//     }
//   })();