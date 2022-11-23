const Student = require("../../models/students/students");
const StudenCourses = require("../../models/students/student-courses");
const Courses = require("../../models/courses/courses");


const signup = async (data) => {
    try {
        const student =  new Student(data);
        await student.save()
        return student;         
    } catch(err) {
       throw err;
    }
}

const signin = async ({email, password}) => {
    try {
        const student = await Student.signin(email, password);
        const token = await student.generateAuthToken();
        console.log(student, "hel");
        return {student, token};
    } catch(err) {
       throw err;
    }
}


const addCourses = async (courseName, student) => {
    try {
        const courseDetails = await Courses.findOne({courseName});
        if(!courseDetails.noOfSeatsAvailable) throw Error("seats not available");

        const course =  new StudenCourses({studentId: student._id, courseId: courseDetails._id, enrollOn: new Date()});
        await course.save()
        return "Courses is added successfuly";         
    } catch(err) {
       throw err;
    }
}

const getCourses = async (student) => {
    try {
        await student.populate({
            path: "studentCourses"
        })

    
        return student.studentCourses
        
    } catch(err) {
       throw err;
    }
}

module.exports = {
    signup,
    signin,
    addCourses,
    getCourses
}