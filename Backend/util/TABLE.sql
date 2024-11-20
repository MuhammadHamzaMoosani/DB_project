USE ibacoursearchieve;
-- Course table
-- CREATE TABLE IF NOT EXISTS Course (
--     Course_ID int AUTO_INCREMENT PRIMARY KEY,
--     Course_Code varchar(255),
--     Course_name varchar(255) NOT NULL,
--     Course_type ENUM('Under-Graduate', 'Graduate', 'Post_Graduate') NOT NULL,
--     Program ENUM('BSCS', 'BSECO', 'BSAF', 'BSEM', 'BSSS', 'BBA', 'BSMath') NOT NULL,
--     School ENUM('School of Mathematics and Computer Sciences', 'School of Social Sciences and Economics', 'School of Business Studies') NOT NULL,
--     Semester_Year varchar(255),
--     Course_description varchar(255),
--     Course_Outline LONGBLOB,
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
-- Insert additional instructors
-- INSERT INTO Instructor (Instructor_name, Instructor_email) VALUES
-- ('Dr. Carol', 'carol@example.com'),
-- ('Dr. David', 'david@example.com'),
-- ('Dr. Eve', 'eve@example.com'),
-- ('Dr. Frank', 'frank@example.com'),
-- ('Dr. Grace', 'grace@example.com'),
-- ('Dr. Henry', 'henry@example.com');



-- -- -- -- Course Instructor
-- -- -- INSERT INTO Course_Instructor (Course_ID, Instructor_ID) VALUES
-- -- -- (1, 1),
-- -- -- (2, 2);
-- -- Assign instructors to all courses
-- INSERT INTO Course_Instructor (Course_ID, Instructor_ID) VALUES
-- (3, 3), -- Dr. Carol
-- (5, 4), -- Dr. David
-- (6, 5), -- Dr. Eve
-- (7, 1), -- Dr. Alice
-- (8, 2), -- Dr. Bob
-- (9, 3), -- Dr. Carol
-- (10, 6), -- Dr. Frank
-- (11, 4), -- Dr. David
-- (12, 5); -- Dr. Eve


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
-- DROP PROCEDURE IF EXISTS FetchCourseDetails_Instructor;


-- CREATE PROCEDURE FetchCourseDetails_Instructor(IN input_course_ID INT)
-- BEGIN
--     -- Fetch Course Details and Instructor Name
--     SELECT 
--         c.Course_ID,
--         c.Course_Code,
--         c.Course_name,
--         c.Course_type,
--         c.Program,
--         c.School,
--         c.Semester_Year,
--         c.Course_description,
--         c.Course_Outline,
--         c.Course_Status,
--         c.Course_image,
--         c.Topics,
--         i.Instructor_name
--     FROM 
--         Course c
--     JOIN Course_Instructor ci ON c.Course_ID = ci.Course_ID -- Assuming the join table is `CourseInstructor`
--     JOIN Instructor i ON ci.Instructor_ID = i.Instructor_ID
--     WHERE 
--         c.Course_ID = input_course_ID;

--     -- Update Course Views
--     UPDATE Course 
--     SET Views = Views + 1 
--     WHERE Course_ID = input_course_ID;
-- END;
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

