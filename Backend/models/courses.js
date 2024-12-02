const multer = require('multer');
const db=require('../util/database')

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

module.exports=class Courses
{
    constructor(Course_Code,Course_name,Course_type,Program,Semester_year,Course_description,Course_Outline,Course_Status, Course_image, School)
    {
        this.Course_Code=Course_Code;
        this.Course_name=Course_name;
        this.Course_type=Course_type;
        this.Program=Program;
        this.Semester_year=Semester_year;
        this.Course_description=Course_description;
        this.Course_Outline=Course_Outline;
        this.Course_Status=Course_Status;
        this.Course_image=Course_image;
        this.School=School;

    }
    save()
    {
        const sql='CALL insertIntoCourse(?,?,?,?,?,?,?,?,?)';
        const values=[this.Course_Code,this.Course_name,this.Course_type,this.Program,this.Semester_year,this.Course_description,this.Course_Outline,this.Course_Status, this.School];
        return db.execute(sql,values)
    }
    static async uploadFile(course_id, material_type, material_description, fileBuffer) {
        const sql = `CALL insertCourseMaterial(?,?,?,?)`;
        const values = [course_id, material_type, material_description, fileBuffer, 'Unapproved'];
        return db.execute(sql, values);
    }
    static async uploadOutline(course_id, fileBuffer) {
        const sql = ` INSERT INTO Course (Course_Outline) VALUES (?) WHERE Course_ID = ?`;
        return db.execute(sql, [course_id, fileBuffer]);
    }
    static fetchAll()
    {
        const sql='SELECT * from Course';
        return db.execute(sql)
    }
    static findByID(courseID)
    {
        const sql='SELECT * from Course where Course_ID = ?';
        const values=[`%${courseID}%`]
        return db.execute(sql,values)
    }
    static  fetchCourseMaterial(id, type) {
        const sql = `SELECT * from Course_Material WHERE Course_ID=? AND Material_type=?`;
        const values = [id, type];
        console.log(values)
        return db.execute(sql, values);
    }
    static find(courseName)
    {
        const sql='SELECT * from Course where Course_name like ?';
        const values=[`%${courseName}%`]
        return db.execute(sql,values)
    }
    static delete(id)
    {
        const sql=`Delete from Users 
                    where User_ID=?`;
        const values=[id];
        return db.execute(sql,values);
    }   
    static fetchCourseDetails(Course_ID) {
        const sql = `CALL FetchCourseDetails_Instructor(?)`; // my stored procedure
        return db.execute(sql, [Course_ID]); 
    }
    static fetchCoursebyProgram(Program_name) {
        const sql = `CALL fetchByProgram(?)`;
       return db.execute(sql, [Program_name])
        
    }
    static async updatePopularityScores() {
        const sql = `CALL updatePopularity()`; 
        try {
            const result = await db.execute(sql);
            console.log("Popularity scores updated:", result);
            return result;
        } catch (err) {
            console.error("Error updating popularity scores:", err);
            throw err; // Throw the error so it propagates correctly.
        }
    }
    
    static async fetchTopCourses() {
        const sql = `CALL fetchPopularCourses()`;
        return db.execute(sql)
        .then(([rows]) => {
            console.log(rows); // The result set returned by the procedure
            return rows;
            })
            .catch(err => {
                console.error('Error fetching popular courses:', err);
                throw err;
            });
    }
    static async fetchCourseByTopic(topics) {
        const tags = topics
        const sql = `SELECT * FROM Course WHERE JSON_OVERLAPS(topic_tags, ?)`;
        const [rows] = await db.execute(sql, [tags]);
    }
    //Added by Asna
    static async downloadFile(materialId) {
    const query = `
        SELECT Material_Description, Material_File
        FROM Course_Material
        WHERE Material_ID = ?;
    `;

    try {
        const [result] = await db.execute(query, [materialId]);

        if (result.length === 0) {
            return null; // Material not found
        }

        return result[0]; // Return the material's binary data and metadata
    } catch (error) {
        console.error("Error fetching course material from database:", error);
        throw new Error("Database query failed.");
    }
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