const db=require('../util/database')

module.exports=class Users
{
    constructor(User_ID,User_name,User_email,User_password,User_Type)
    {
        this.User_ID=User_ID;
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
                        INSERT INTO Deleted_Users (User_ID, User_name, User_email, User_password, User_Type, deletedDate)
                        values(OLD.User_ID,OLD.User_name,OLD.User_email,OLD.User_password,OLD.User_Type,NOW());
                    END;`
        return db.query(sql);
    }
    static createProcedure(Course_ID)
    {
        const sql=`CALL FetchCourseDetails(?)`;
        return db.execute(sql, [Course_ID]);
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