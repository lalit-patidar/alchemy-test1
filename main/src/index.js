const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const studentRoutes = require("./routers/student/student")
const teacherRoutes = require("./routers/teacher/teacher")
require("../config/db/mongoose-setup");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(studentRoutes);
app.use(teacherRoutes);

app.listen(port, () => console.log("server is running at port 3000"));
