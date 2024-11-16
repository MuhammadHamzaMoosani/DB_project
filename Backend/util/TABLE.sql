-- Department table
CREATE TABLE IF NOT EXISTS Department (
    Department_ID int PRIMARY KEY,
    Department_Name varchar(255) NOT NULL
);

-- Course table
CREATE TABLE IF NOT EXISTS Course (
    Course_ID int PRIMARY KEY,
    Course_Code varchar(255),
    Course_name varchar(255) NOT NULL,
    Course_type ENUM('Under-Graduate', 'Graduate', 'Post_Graduate') NOT NULL,
    Program ENUM('BSCS', 'BSECO', 'BSAF', 'BSEM', 'BSSS', 'BBA', 'BSMath') NOT NULL,
    Semester_Year varchar(255),
    Course_description varchar(255),
    Resources varchar(2083),
    Course_Status ENUM('Active', 'Archived') NOT NULL
);

-- Instructor table
CREATE TABLE IF NOT EXISTS Instructor (
    Instructor_ID int PRIMARY KEY,
    Instructor_name varchar(255) NOT NULL,
    Instructor_email varchar(255),
    Department_ID int NOT NULL,
    FOREIGN KEY (Department_ID) REFERENCES Department(Department_ID)
);

-- Course Metrics table
CREATE TABLE IF NOT EXISTS Course_Metrics (
    Course_Metric_ID int PRIMARY KEY,
    Course_ID int NOT NULL,
    Views int DEFAULT 0,
    Bookmarks int DEFAULT 0,
    Downloads int DEFAULT 0,
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);

-- Course Instructor table
CREATE TABLE IF NOT EXISTS Course_Instructor (
    Course_ID int NOT NULL,
    Instructor_ID int NOT NULL,
    PRIMARY KEY (Course_ID, Instructor_ID),
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID),
    FOREIGN KEY (Instructor_ID) REFERENCES Instructor(Instructor_ID)
);

-- Course Material table
CREATE TABLE IF NOT EXISTS Course_Material (
    Material_ID int PRIMARY KEY,
    Course_ID int NOT NULL,
    Material_type ENUM('Course_Outline', 'Lecture Notes', 'Assignment', 'Lab', 'Quiz', 'Exam', 'Project', 'Video') NOT NULL,
    Material_Description varchar(255),
    Material_File varchar(2083),
    Material_Link varchar(2083),
    Additional_resources varchar(2083),
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    User_ID int PRIMARY KEY,
    User_name varchar(255),
    User_email varchar(255),
    User_password varchar(255),
    User_Type ENUM('Admin', 'Student') NOT NULL
);

-- Bookmark table
CREATE TABLE IF NOT EXISTS Bookmark (
    Bookmark_ID int PRIMARY KEY,
    User_ID int,
    Course_ID int,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);

-- Bookmark Material table
CREATE TABLE IF NOT EXISTS Bookmark_Material (
    Bookmark_Material_ID int PRIMARY KEY,
    Material_ID int,
    Bookmark_ID int,
    Material_Type varchar(255),
    FOREIGN KEY (Material_ID) REFERENCES Course_Material(Material_ID),
    FOREIGN KEY (Bookmark_ID) REFERENCES Bookmark(Bookmark_ID)
);
CREATE TABLE IF NOT EXISTS DELETED_USERS
(
    User_ID int PRIMARY KEY,
    User_name varchar(255),
    User_email varchar(255),
    User_password varchar(255),
    User_Type ENUM('Admin', 'Student') NOT NULL,
   	deletedDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);
