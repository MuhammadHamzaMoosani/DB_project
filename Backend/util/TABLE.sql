CREATE TABLE IF NOT EXISTS Course (
	Course_ID int NOT NULL unique,
	Course_name varchar(255) NOT NULL,
	Course_type varchar(255),
	Course_description varchar(255),
    Resources varchar(2083),
    PRIMARY KEY (Course_ID)
);
CREATE TABLE IF NOT EXISTS Department (
	Department_ID int NOT NULL unique,
	Department_name varchar(255) NOT NULL,
    PRIMARY KEY (Department_ID)
);
CREATE TABLE IF NOT EXISTS Teacher (
	Teacher_ID int NOT NULL unique,
	Teacher_name varchar(255) NOT NULL,
	Department_ID int,
	Contact_no varchar(255),
    PRIMARY KEY (Teacher_ID),
    FOREIGN KEY (Department_ID) REFERENCES Department(Department_ID)
);
CREATE TABLE IF NOT EXISTS Teacher_Course (
	Course_ID int NOT NULL,
    Teacher_ID int NOT NULL,
    Semester_Year varchar(255),
    Course_status varchar(255),
    Department_ID int,
    CONSTRAINT pk_TeacherCourse PRIMARY KEY(Course_ID, Teacher_ID),
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID),
    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID),
    FOREIGN KEY (Department_ID) REFERENCES Department(Department_ID)
);
CREATE TABLE IF NOT EXISTS Course_Material (
	Material_ID int,
	Course_ID int NOT NULL,
    Material_type enum('Course_Outline', 'Lecture', 'Assignment', 'Lab', 'Quiz', 'Exam', 'Project', 'Video'),
    Material_Description varchar(255),
    Material_File varchar(2083),
    Material_Link varchar(2083),
    PRIMARY KEY (Material_ID),
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);
CREATE TABLE IF NOT EXISTS Administrator (
	Admin_ID int NOT NULL UNIQUE,
    Admin_name varchar(255),
    Admin_password varchar(255),
    PRIMARY KEY (Admin_ID)
);
CREATE TABLE IF NOT EXISTS Student (
	Student_ID int NOT NULL UNIQUE,
    Student_name varchar(255),
    Student_password varchar(255),
    PRIMARY KEY (Student_ID)
);
CREATE TABLE IF NOT EXISTS Teaching_Assistant (
	TA_ID int NOT NULL UNIQUE,
    Teacher_ID int,
    TA_name varchar(255),
    TA_password varchar(255),
    PRIMARY KEY (TA_ID),
    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID)
);
CREATE TABLE IF NOT EXISTS Bookmark (
	Bookmark_ID int NOT NULL UNIQUE,
    Student_ID int,
    Course_ID int,
    PRIMARY KEY (Bookmark_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
	FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
);
CREATE TABLE IF NOT EXISTS Bookmark_Material (
	Bookmark_Material_ID int ,
    Material_ID int,
    Bookmark_ID int,
    Material_Type varchar(255),
    PRIMARY KEY (Bookmark_Material_ID),
	FOREIGN KEY (Material_ID) REFERENCES Course_Material(Material_ID),
    FOREIGN KEY (Bookmark_ID) REFERENCES Bookmark(Bookmark_ID)
);