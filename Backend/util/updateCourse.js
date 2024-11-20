const db = require('./database'); // Import shared database connection
const fs = require('fs');
const path = require('path');

module.exports = class CourseUpdater {
  static async updateCourseOutline() {
    try {
      // File Path and Course ID to Update
      const filePath = path.join(__dirname, '/cse141-fall22-syllabus.pdf'); // Ensure the path is correct
      const courseId = 1; // Replace with the Course_ID of the record you want to update

      // Read the PDF File as Binary
      const fileData = fs.readFileSync(filePath);

      // Update the Course_Outline Column
      const query = 'UPDATE Course SET Course_Outline = ? WHERE Course_ID = ?';
      const [result] = await db.query(query, [fileData, courseId]);

      console.log(`Course_Outline updated successfully for Course_ID: ${courseId}`);
    } catch (error) {
      console.error('Error updating Course_Outline:', error);
    }
  }
};
