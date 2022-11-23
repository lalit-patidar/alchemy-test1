const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
   courseName : {
       type: String,
       required: true
   },
  noOfSeatsAvailable: Number
    
});



const Courses = mongoose.model('Courses', courseSchema)

module.exports = Courses;