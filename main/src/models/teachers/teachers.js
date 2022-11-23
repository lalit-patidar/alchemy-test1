const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
    teacherName: String,
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


teacherSchema.methods.toJSON = function () {
    const teacher = this
    const teacherObject = teacher.toObject()

    delete teacherObject.password
    delete teacherObject.tokens

    return teacherObject
}



teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this;
    const token = jwt.sign({_id: teacher._id.toString()}, "kjdbvjdb54545vjbhdb");

    teacher.tokens = teacher.tokens.concat({token});
    await teacher.save()
    return token;
}

teacherSchema.statics.signin = async (email, password) => {

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
        throw new Error("teacher not found")
    }

    const passwordIsMatch = bcrypt.compare(password, teacher.password);

    if (!passwordIsMatch) throw new Error("password is wrong");

    return teacher;

}

teacherSchema.pre('save', async function(next) {
    const teacher = this;
    if(teacher.isModified("password")) {
        teacher.password = await bcrypt.hash(teacher.password, 8);
    }

    next();
})

teacherSchema.pre("remove", async function(next) {
    const teacher = this;
    await Tasks.deleteMany({owner: teacher._id});
    next();
})


const Teacher = mongoose.model('Teachers', teacherSchema)

module.exports = Teacher;