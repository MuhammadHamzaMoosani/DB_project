const db=require('../util/database')

module.exports=class Courses
{
    constructor(Course_ID,Course_Code,Course_name,Course_type,Program,Semester_year,Course_description,Resources,Course_Status)
    {
        this.Course_ID=Course_ID;
        this.Course_Code=Course_Code;
        this.Course_name=Course_name
        this.Course_type=Course_type
        this.Program=Program
        this.Semester_year=Semester_year
        this.Course_description=Course_description
        this.Resources=Resources
        this.Course_Status=Course_Status

    }
    save()
    {
        const sql='INSERT INTO course VALUES(?,?,?,?,?)';
        const values=[this.Course_ID,this.Course_Code,this.Course_name,this.Course_type,this.Program,this.Semester_year,this.Course_description,this.Resources,this.Course_Status];
        return db.execute(sql,values)
    }
    update(User_name,User_email,User_password,User_ID)
    {
        const sql=`UPDATE users
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
        const sql='SELECT * from course';
        return db.execute(sql)
    }
    static delete(id)
    {
        const sql=`Delete from users 
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