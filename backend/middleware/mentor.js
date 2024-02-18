const jwt = require("jsonwebtoken");
const {jwtKey} = require("./verify.js");
const {Mentor} = require("../db/index.js");

// middleware for handling
async function mentorMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decoded = await jwt.verify(token, jwtKey);
        const { _id } = decoded;
        const data = await Mentor.find({_id:_id});
        if (data) {
            //   user it present in the database and has verified token
            next();

        } else {
            //   user is not present in the database
            console.log('user is not present in the database');
            res.status(404).json({
                error:"User not found"
            })
        }
    } catch (err) {
        console.log("token failed signature verification");
        res.status(401).json({
            error: "Invalid Token"
        })
    }
}

module.exports = {
    mentorMiddleware
}
