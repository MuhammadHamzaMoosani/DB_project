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
    static getCode(id)
    {
      const sql=`Select code from Users
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
    static findByEmail(email)
    {
        const sql=`Select * from Users
                    where User_email=? `;
        const values=[email]
        return db.execute(sql,values);
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

    static addBookmark(userId, courseId, materialId, materialType) {
    
          // Step 1: Check if bookmark already exists for this user and course
          const checkBookmarkQuery = `SELECT Bookmark_ID FROM Bookmark WHERE User_ID = ? AND Course_ID = ?`;

          return db.query(checkBookmarkQuery, [userId, courseId], (error, results) => {
              if (error) {
                  console.error('Error while checking for existing bookmark:', error);
              }

              if (results.length > 0) {
                  // If bookmark exists, insert into Bookmark_Material
                  const bookmarkId = results[0].Bookmark_ID;
                  const insertBookmarkMaterialQuery = `INSERT INTO Bookmark_Material (Material_ID, Bookmark_ID, Material_Type) VALUES (?, ?, ?)`;

                  db.query(insertBookmarkMaterialQuery, [materialId, bookmarkId, materialType], (insertError, insertResults) => {
                      if (insertError) {
                          console.error('Error while adding bookmark material:', insertError);
                      }
                      resolve(insertResults);
                  });
              } else {
                  // If bookmark doesn't exist, first insert into Bookmark table
                  const insertBookmarkQuery = `INSERT INTO Bookmark (User_ID, Course_ID) VALUES (?, ?)`;

                  db.query(insertBookmarkQuery, [userId, courseId], (insertError, insertResults) => {
                      if (insertError) {
                          console.error('Error while adding bookmark:', insertError);
                      }

                      const newBookmarkId = insertResults.insertId;

                      // Insert into Bookmark_Material table with the new Bookmark_ID
                      const insertBookmarkMaterialQuery = `INSERT INTO Bookmark_Material (Material_ID, Bookmark_ID, Material_Type) VALUES (?, ?, ?)`;

                      db.query(insertBookmarkMaterialQuery, [materialId, newBookmarkId, materialType], (insertMaterialError, insertMaterialResults) => {
                          if (insertMaterialError) {
                              console.error('Error while adding bookmark material:', insertMaterialError);
                              return reject(new Error('Failed to add bookmark material'));
                          }
                          resolve(insertMaterialResults);
                      });
                  });
              }
          });
  }
  static getBookmarks(userId) {
        // Step 1: Get all bookmarks for the user from the Bookmark table
        const getBookmarksQuery = `
            SELECT b.Bookmark_ID, c.Course_ID, c.Course_Name, bm.Material_ID, cm.Material_Type, cm.Material_Description
            FROM Bookmark b
            JOIN Course c ON b.Course_ID = c.Course_ID
            LEFT JOIN Bookmark_Material bm ON b.Bookmark_ID = bm.Bookmark_ID
            LEFT JOIN Course_Material cm ON bm.Material_ID = cm.Material_ID
            WHERE b.User_ID = ?
        `;
        
        return db.query(getBookmarksQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error while fetching bookmarks:', error);
            }

            // Step 2: Return the results
            resolve(results);
        });
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