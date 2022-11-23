const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
   studentId : {
       type: mongoose.Types.ObjectId,
       ref: "Students",
       required: true
   },
   courseId : {
    type: mongoose.Types.ObjectId,
    ref: "Courses",
    required: true
    },
    enrollOn: Date,
    status: Boolean
});



const StudentCourses = mongoose.model('StudentCourses', courseSchema)

module.exports = StudentCourses;