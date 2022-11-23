const express = require("express");
const { signinController, signupController, createCourseController} = require("../../controllers/teachers/teachers")

const router = express.Router();

router.post('/teacher/signup', signupController);
router.post('/teacher/signin', signinController);
router.post('/teacher/create-course', createCourseController);

module.exports = router;