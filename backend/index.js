const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const memberRouter = require('./routes/protected_routes/member.js')
const mentorRouter = require('./routes/protected_routes/mentor.js')
const studentRouter = require('./routes/protected_routes/student.js')
const generalRouter = require('./routes/general.js')
const {connectDB}=require('./db/index.js')
const cors=require('cors')

//for frontend request we are using cors
app.use(cors())
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/member", memberRouter);
app.use("/mentor", mentorRouter);
app.use("/student", studentRouter);
app.use("/general", generalRouter);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
connectDB()