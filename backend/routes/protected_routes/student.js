const express = require("express");
const { jwtKey } = require("../../middleware/verify.js");
const { studentMiddleware } = require("../../middleware/student.js");
const {
  Member,
  Student,
  Club,
  Field,
  Blog,
  Mentor,
} = require("../../db/index.js");
const bcrypt = require("bcryptjs");
const router = express.Router();
var jwt = require("jsonwebtoken");

//student login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email: email });
    if (!user) {
      res.status(403).json({
        message: "Email is not registered",
      });
    }
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      return res.status(403).json({
        message: "Wrong password",
      });
    }

    //waiting for jwt

    const token = jwt.sign({ _id: user._id }, jwtKey, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// create account route
router.post("/register", async (req, res) => {
  try {
    const { name, email, bio, linkedinLink, contactNumber, field, password } =
      req.body;

    // console.log(req.body);

    const ele = await Field.findOne({ name: field });

    const id = ele._id;

    const user = await Student.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "Already exist please Login ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      bio,
      linkedinLink,
      contactNumber,
      id,
      password: hashedPassword,
    });
    console.log(ele);
    ele.students.push(student._id);
    await student.save();
    await ele.save();
    return res.status(200).json({
      message: "student registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// current info fetch
router.get("/info", studentMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const { _id } = jwt.decode(token);
  try {
    const data = await Student.findById(_id);
    res.json({
      info: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// change basic info route
router.put("/changeinfo", studentMiddleware, async (req, res) => {
  // this arr new info's
  const { name, email, bio, linkedinLink, contactNumber, field } = req.body;
  const token = req.headers.authorization;
  const { _id } = jwt.decode(token);
  try {
    const ele = await Field.findOne({name: field});
    const id = ele._id;
    await Student.findByIdAndUpdate(_id, {
      name,
      email,
      bio,
      linkedinLink,
      contactNumber,
      field:id,
    });
    res.json({
      message: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// chnage password route

router.put("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});
module.exports = router;
