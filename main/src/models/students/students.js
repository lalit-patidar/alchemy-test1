const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentCourses = require("./student-courses")

const studentSchema = new mongoose.Schema({
    studentName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

studentSchema.virtual('studentCourses', {
    ref: "StudentCourses",
    foreignField: 'studentId',
    localField: '_id'
});

studentSchema.methods.toJSON = function () {
    const student = this
    const studentObject = student.toObject()

    delete studentObject.password
    delete studentObject.tokens

    return studentObject
}

studentSchema.methods.generateAuthToken = async function () {
    const student = this;
    const token = jwt.sign({_id: student._id.toString()}, "kjdbvjdb54545vjbhdb");

    student.tokens = student.tokens.concat({token});
    await student.save()
    return token;
}

studentSchema.statics.signin = async (email, password) => {

    const student = await Student.findOne({ email });

    if (!student) {
        throw new Error("student not found")
    }

    const passwordIsMatch = bcrypt.compare(password, student.password);

    if (!passwordIsMatch) throw new Error("password is wrong");

    return student;

}

studentSchema.pre('save', async function(next) {
    const student = this;
    if(student.isModified("password")) {
        student.password = await bcrypt.hash(student.password, 8);
    }

    next();
})

studentSchema.pre("remove", async function(next) {
    const student = this;
    await StudentCourses.deleteMany({owner: student._id});
    next();
})


const Student = mongoose.model('Students', studentSchema)

module.exports = Student;