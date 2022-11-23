const {signin, signup, createCourses, getCourses} = require("../../services/teacher/teacher");


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
       res.send(err.message)
    }
}

const createCourseController = async (req, res) => {
    try {
        const serviceResponse = await createCourses(req.body);
        res.send(serviceResponse)
         
    } catch(err) {
       res.send(err.message)
    }
}

const getCourseController = async (req, res) => {
    try {
        const serviceResponse = await createCourses(req.body);
        res.send(serviceResponse)
         
    } catch(err) {
       res.send(err.message)
    }
}


module.exports = {
    signupController,
    signinController,
    createCourseController,
    getCourseController
}