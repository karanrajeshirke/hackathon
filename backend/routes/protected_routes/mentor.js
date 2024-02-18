const express = require("express");
const { jwtKey } = require("../../middleware/verify.js");
const { mentorMiddleware } = require("../../middleware/mentor.js");
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
const JWT = require("jsonwebtoken");

//Member login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Mentor.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      return res.json(403).send({
        message: "Wrong password",
      });
    }
    //waiting for jwt
    const token = await JWT.sign({ _id: user._id }, jwtKey, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Logged In Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// create account route
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      bio,
      linkedinLink, // Fix typo from linkinLink to linkedinLink
      contactNumber,
      field,
      password
    } = req.body;

    const ele = await Field.findOne({ name: field });
    const id = ele._id;
    const user = await Mentor.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Already exist please Login ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const mentor = new Mentor({
      name,
      email,
      bio,
      contactNumber,
      linkedinLink, // Fix typo from linkinLink to linkedinLink
      field: id,
      password: hashedPassword,
    });

    await mentor.save();

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
router.get("/info", mentorMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const { _id } = JWT.decode(token);
  try {
    const data = await Mentor.findById(_id);
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
router.put("/changeinfo", mentorMiddleware, async (req, res) => {
  // this arr new info's
  const { name, email, bio, linkedinLink, contactNumber, field } = req.body; // Fix typo from linkinLink to linkedinLink
  const token = req.headers.authorization;
  const { _id } = JWT.decode(token);

  try {
    const ele = await Field.findOne({name: field});
    const id = ele._id;
    await Mentor.findByIdAndUpdate(_id, {
      name,
      email,
      bio,
      linkedinLink, // Fix typo from linkinLink to linkedinLink
      contactNumber,
      field:id,
    });
    res.json({
      messge: "Changed info successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// change password route
router.put("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await Mentor.findOne({ email:email });

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
    console.error(error);
  }
});

module.exports = router;
