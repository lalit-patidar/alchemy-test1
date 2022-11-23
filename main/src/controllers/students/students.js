const {signin, signup, addCourses, getCourses} = require("../../services/students/student");


const signupController = async (req, res) => {
    try {
        const serviceResponse = await signup(req.body);
        res.send(serviceResponse)
         
    } catch(err) {
       res.send(err.message)
    }
}

const signinController = async (req, res) => {
    try {
        const serviceResponse = await signin(req.body);
        res.send(serviceResponse)
         
    } catch(err) {
        console.log(err, "signin");
       res.send(err.message)
    }
}

const addCourseController = async (req, res) => {
    try {
        let courseName = req.body.courseName;
        const serviceResponse = await addCourses(courseName, req.student);
        res.send(serviceResponse)
         
    } catch(err) {
       res.send(err.message)
    }
}

const getCourseController = async (req, res) => {
    try {
        const serviceResponse = await getCourses(req.student);
        res.send(serviceResponse)
         
    } catch(err) {
       res.send(err.message)
    }
}


module.exports = {
    signupController,
    signinController,
    addCourseController,
    getCourseController
}