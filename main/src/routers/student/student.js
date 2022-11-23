const express = require("express");
const { signinController, signupController, addCourseController, getCourseController} = require("../../controllers/students/students")
const auth = require("../../middlewares/studentAuth");

const router = express.Router();

router.post('/student/signup', signupController);
router.post('/student/signin', signinController);
router.post('/student/add-course', auth, addCourseController);
router.post('/student/get-course', auth, getCourseController);


module.exports = router;