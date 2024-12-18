const db=require('../util/database')
module.exports=class Users
{
    constructor(User_name,User_email,User_password,User_Type)
    {
        this.User_name=User_name;
        this.User_email=User_email
        this.User_password=User_password
        this.User_Type=User_Type
    }
    save()
    {
        const sql='INSERT INTO Users (User_name, User_email, User_password, User_Type) VALUES (?, ?, ?, ?)';
        const values=[this.User_name,this.User_email,this.User_password,this.User_Type];
        return db.execute(sql,values)
    }
    static saveCode(id,code)
    { 
      const sql=`UPDATE Users
                    set code=? where User_ID=?` ;
        const values=[code,id]
        return db.execute(sql,values);
    }
    static deleteCode(id)
    {
      const sql=`UPDATE Users
      set code=NULL where User_ID=?` ;
      const values=[id]
      return db.execute(sql,values); 
    }
    static getStatus(id)
    {
      const sql=`Select active from Users
                  where User_ID=?` ;
        const values=[id]
        return db.execute(sql,values);
    }
    static setStatus(id,status)
    {
      const sql=`UPDATE Users
      set active=?
      where User_ID=?` ;
      const values=[id,status]
      return db.execute(sql,values);
    }
    static getCode(id)
    {
      const sql=`Select User_email,User_password,code from Users
                  where User_ID=?` ;
        const values=[id]
        return db.execute(sql,values);
    }
    update(User_name,User_email,User_password,User_ID)
    {
        const sql=`UPDATE Users
                    set User_name=?,User_email=?,User_password=?
                    where User_ID=?` ;
        const values=[User_name,User_email,User_password,User_ID]
        return db.execute(sql,values);
    }
    static findByID(id)
    {
        const sql=`Select * from Users
                    where User_ID=? `;
        const values=[id]
        return db.execute(sql,values);
    }
    static async findByEmail(email)
    {
        const sql=`Select * from Users
                    where User_email=? `;
        const values=[email];
        const [rows] = await db.query(sql, [email]);
        //console.log("findByEmail result:", rows);
        return rows[0];
    }
    static fetchAll()
    {
        const sql='SELECT User_ID,User_name,User_email,User_Type from Users';
        return db.execute(sql)
    }
    static delete(id)
    {
        const sql=`Delete from Users 
                    where User_ID=?`;
        const values=[id];
        return db.execute(sql,values);
    }   
    // Save temporary user details during signup
    static saveTemporaryUser(name, email, password, otp, userType, expiresAt) {
        const query = `INSERT INTO temporary_users (name, email, password, otp, user_type, expires_at)
                       VALUES (?, ?, ?, ?, ?, ?)
                       ON DUPLICATE KEY UPDATE 
                       password = VALUES(password), 
                       otp = VALUES(otp), 
                       expires_at = VALUES(expires_at)`;
        return db.execute(query, [name, email, password, otp, userType, expiresAt]);
    }
    static getCodeSignUp(id) 
    {
      const sql=`Select User_email,User_password,code from temporary_users
                  where User_ID=?` ;
        const values=[id]
        return db.execute(sql,values);
    }
    // Find temporary user by email
    static findTemporaryUserByEmail(email) {
        const query = `SELECT * FROM temporary_users WHERE email = ? AND expires_at > NOW()`;
        return db.execute(query, [email]);
    }

    // Delete temporary user
    static deleteTemporaryUser(email) {
        const query = `DELETE FROM temporary_users WHERE email = ?`;
        return db.execute(query, [email]);
    }
    static createTrigger()
    {
        const sql=`
                    CREATE TRIGGER logDeletedUsers
                    AFTER DELETE ON Users
                    For each row
                    BEGIN
                        INSERT INTO DELETED_USERS (User_ID, User_name, User_email, User_password, User_Type, deletedDate)
                        values(OLD.User_ID,OLD.User_name,OLD.User_email,OLD.User_password,OLD.User_Type,NOW());
                    END;`
        return db.query(sql);
    }
    static createProcedure(Course_ID)
    {
        const sql=`CALL FetchCourseDetails(?)`;
        return db.execute(sql, [Course_ID]);
    }

    static async addBookmark(userId, courseId) {
      try {
          // Check if the bookmark already exists
          const checkBookmarkQuery = `SELECT Bookmark_ID FROM Bookmark WHERE User_ID = ? AND Course_ID = ?`;
          const [results] = await db.execute(checkBookmarkQuery, [userId, courseId]);
  
          if (results.length == 0) {
              // If bookmark exists, insert into Bookmark_Material
              const insertBookmarkMaterialQuery = `INSERT INTO Bookmark (User_ID, Course_ID) VALUES (?, ?)`;
              const [insertResults] = await db.execute(insertBookmarkMaterialQuery, [userId, courseId]);
  
              console.log('Bookmark added successfully:', insertResults);
              return insertResults;
          } else {
              console.log(' existing bookmark found.');
              return null; // Resolve with null if no bookmark exists
          }
      } catch (error) {
          console.error('Error while adding bookmark:', error);
          throw error;
      }
  }
  
  static async getBookmarks(userId) {
        const query = `SELECT * from Course c JOIN Bookmark b ON c.Course_ID=b.Course_ID where b.User_ID = ? `;
        const rows = await db.execute(query, [userId]);

        console.log("Query result (parsed):", rows);
        return rows;
}
  static async deleteBookmarks(Course_ID, userId) {
        const checkBookmarkQuery = 'SELECT * FROM Bookmarks WHERE Course_ID = ? AND User_ID = ?';
        const [existingBookmark] = await db.query(checkBookmarkQuery, [Course_ID, userId]);

        if (existingBookmark.length === 0) {
            return res.status(404).json({ success: false, message: "Bookmark not found." });
        }
        const deleteBookmarkQuery = 'DELETE FROM Bookmarks WHERE Course_ID = ? AND User_ID = ?';
        return await db.query(deleteBookmarkQuery, [Course_ID, userId]);
  }
  };

(async function defineTrigger() {
    try {
      await module.exports.createTrigger();
      console.log('Trigger "log deleted users" created successfully.');
    } catch (err) {
      if (err.code === 'ER_SP_ALREADY_EXISTS') {
        // console.log('Trigger "log Deleted users" already exists.');
      } else {
        // console.error('Error creating trigger:', err);
      }
    }
  })();
  
  (async function defineProcedure() {
    try {
      await module.exports.createProcedure();
      console.log('Procedure "FetchCourseDetails" created successfully.');
    } catch (err) {
      if (err.code === 'ER_SP_ALREADY_EXISTS') {
        // console.log('Trigger "after_product_delete" already exists.');
      } else {
        // console.error('Error creating trigger:', err);
      }
    }
  })();