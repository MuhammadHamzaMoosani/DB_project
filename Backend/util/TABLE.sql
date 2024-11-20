-- USE ibacoursearchieve;
-- -- Course table
-- CREATE TABLE IF NOT EXISTS Course (
--     Course_ID int AUTO_INCREMENT PRIMARY KEY,
--     Course_Code varchar(255),
--     Course_name varchar(255) NOT NULL,
--     Course_type ENUM('Under-Graduate', 'Graduate', 'Post_Graduate') NOT NULL,
--     Program ENUM('BSCS', 'BSECO', 'BSAF', 'BSEM', 'BSSS', 'BBA', 'BSMath') NOT NULL,
--     School ENUM('SMCS', 'SSSE', 'SBS') NOT NULL,
--     Semester_Year varchar(255),
--     Course_description varchar(255),
--     Course_outline LONGBLOB,
--     Course_Status ENUM('Active', 'Archived') NOT NULL,
--     Course_image LONGBLOB,
--     Topics JSON, 
--     Views int DEFAULT 0,
--     Bookmarks int DEFAULT 0,
--     Downloads int DEFAULT 0,
--     Popularity_Score float DEFAULT 0
-- );

-- -- Instructor table
-- CREATE TABLE IF NOT EXISTS Instructor (
--     Instructor_ID int AUTO_INCREMENT PRIMARY KEY,
--     Instructor_name varchar(255) NOT NULL,
--     Instructor_email varchar(255)
-- );

-- -- Course Instructor table
-- CREATE TABLE IF NOT EXISTS Course_Instructor (
--     Course_ID int NOT NULL,
--     Instructor_ID int NOT NULL,
--     PRIMARY KEY (Course_ID, Instructor_ID),
--     FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID),
--     FOREIGN KEY (Instructor_ID) REFERENCES Instructor(Instructor_ID)
-- );

-- -- Course Material table
-- CREATE TABLE IF NOT EXISTS Course_Material (
--     Material_ID int AUTO_INCREMENT PRIMARY KEY,
--     Course_ID int NOT NULL,
--     Material_type ENUM('Course_Outline', 'Lecture Notes', 'Assignment', 'Lab', 'Quiz', 'Exam', 'Project', 'Video') NOT NULL,
--     Material_Description varchar(255),
--     Material_File LONGBLOB,
--     Material_Link varchar(2083),
--     Additional_resources LONGBLOB,
--     FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
-- );

-- -- Users table
-- CREATE TABLE IF NOT EXISTS Users (
--     User_ID int AUTO_INCREMENT PRIMARY KEY,
--     User_name varchar(255),
--     User_email varchar(255),
--     User_password varchar(255),
--     User_Type ENUM('Admin', 'Student') NOT NULL
-- );

-- -- Bookmark table
-- CREATE TABLE IF NOT EXISTS Bookmark (
--     Bookmark_ID int AUTO_INCREMENT PRIMARY KEY,
--     User_ID int,
--     Course_ID int,
--     FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
--     FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
-- );

-- -- Bookmark Material table
-- CREATE TABLE IF NOT EXISTS Bookmark_Material (
--     Bookmark_Material_ID int AUTO_INCREMENT PRIMARY KEY,
--     Material_ID int,
--     Bookmark_ID int,
--     Material_Type varchar(255),
--     FOREIGN KEY (Material_ID) REFERENCES Course_Material(Material_ID),
--     FOREIGN KEY (Bookmark_ID) REFERENCES Bookmark(Bookmark_ID)
-- );

-- CREATE TABLE IF NOT EXISTS DELETED_USERS
-- (
--     User_ID int PRIMARY KEY,
--     User_name varchar(255),
--     User_email varchar(255),
--     User_password varchar(255),
--     User_Type ENUM('Admin', 'Student') NOT NULL,
--    	deletedDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
-- );

-- -- Instructor
-- INSERT INTO Instructor (Instructor_name, Instructor_email) VALUES
-- ('Dr. Alice', 'alice@example.com'),
-- ('Dr. Bob', 'bob@example.com');


-- -- -- Course Instructor
-- -- INSERT INTO Course_Instructor (Course_ID, Instructor_ID) VALUES
-- -- (1, 1),
-- -- (2, 2);

-- -- -- Course Material
-- -- INSERT INTO Course_Material (Course_ID, Material_type, Material_Description, Material_File, Material_Link, Additional_resources) VALUES
-- -- (1, 'Course_Outline', 'Programming course outline', NULL, 'https://example.com/cs101-outline', NULL),
-- -- (2, 'Lecture Notes', 'Linear Algebra Lecture 1 Notes', NULL, 'https://example.com/math201-lecture1', NULL);

-- -- -- Users
-- -- INSERT INTO Users (User_name, User_email, User_password, User_Type) VALUES
-- -- ('John Doe', 'john.doe@example.com', 'password123', 'Student'),
-- -- ('Jane Admin', 'jane.admin@example.com', 'adminpassword', 'Admin');

-- -- -- Bookmark
-- -- INSERT INTO Bookmark (User_ID, Course_ID) VALUES
-- -- (1, 1);

-- -- -- Bookmark Material
-- -- INSERT INTO Bookmark_Material (Material_ID, Bookmark_ID, Material_Type) VALUES
-- -- (1, 1, 'Course_Outline');

-- Procedure to View Course Details
-- CREATE PROCEDURE FetchCourseDetails(IN input_course_ID INT)
-- BEGIN
--     SELECT 
--         Course_ID,
--         Course_Code,
--         Course_name,
--         Course_type,
--         Program,
--         School,
--         Semester_Year,
--         Course_description,
--         Resources,
--         Course_Status,
--         Course_image,
--         Topics
--     FROM 
--         Course
--     WHERE 
--         Course_ID = input_course_ID;
--     -- To update course views                        
--     UPDATE Course 
--     SET Views = Views + 1 
--     WHERE Course_ID = input_course_ID; 
-- END ;

