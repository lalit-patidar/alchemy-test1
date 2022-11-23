const Teacher = require("../../models/teachers/teachers");
const Courses = require("../../models/courses/courses");


const signup = async (data) => {
    try {
        const teacher =  new Teacher(data);
        await teacher.save()
        return teacher;         
    } catch(err) {
       throw err;
    }
}

const signin = async ({email, password}) => {
    try {
        const teacher = await Teacher.signin(email, password);
        const token = await teacher.generateAuthToken();
        console.log(teacher, "hel");
        return {teacher, token};
    } catch(err) {
       throw err;
    }
}


const createCourses = async (courseDetails) => {
    try {

        const course =  new Courses(courseDetails);
        await course.save()
        return "Courses is created successfuly";         
    } catch(err) {
       throw err;
    }
}

const getCourses = async (teacher) => {
    try {

        const courses = await Courses.find();

        return courses
    } catch(err) {
       throw err;
    }
}

module.exports = {
    signup,
    signin,
    createCourses,
    getCourses
}