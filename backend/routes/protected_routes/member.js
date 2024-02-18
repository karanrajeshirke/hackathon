const express = require("express");
const { jwtKey } = require("../../middleware/verify.js");
const { memberMiddleware } = require("../../middleware/member.js");
const { Member, Blog, Club, Event } = require("../../db/index.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const router = express.Router();

// Member login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Member.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "Wrong password" });
    }
    const token = JWT.sign({ _id: user._id }, jwtKey, { expiresIn: "7d" });
    res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create blog
router.post("/createBlog", memberMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  try {
    const { _id } = JWT.decode(token);
    const memberDetails = await Member.findOne({ _id });
    if (!memberDetails) {
      return res.status(404).json({ error: "Member not found" });
    }
    const clubId = memberDetails.club;
    await Blog.create({ title, content, club: clubId, author: _id });
    res.json({ message: "Blog created successfully" });
  } catch (error) {
    // Log and send internal server error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create event
router.post("/createEvent", memberMiddleware, async (req, res) => {
  try {
    const { title, description, date, registrationLink } = req.body; // Assuming you also receive clubId from the request body
    // Create a new event instance
    const token = req.headers.authorization;
    // console.log(token);
    const { _id } = JWT.decode(token);
    // console.log(id);
    const memberElement = await Member.findById(_id);
    const clubId = memberElement.club;
    const event = new Event({
      title,
      description,
      club: clubId, // Assuming clubId is provided in the request body
      date,
      registrationLink,
    });
    // Save the event to the database
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register
router.post("/register", memberMiddleware, async (req, res) => {
  try {
    const { name, email, bio, linkedinLink, contactNumber, club, password } =
      req.body;
    const ele = await Club.findOne({ name: club });
    // console.log(ele);
    const id = ele._id;

    const user = await Member.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Already exist please Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = new Member({
      name,
      email,
      bio,
      linkedinLink,
      contactNumber,
      club: id,
      password: hashedPassword,
    });
    await member.save();

    res.status(200).json({ message: "Member registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Current info fetch
router.get("/info", memberMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const { _id } = JWT.decode(token);
  try {
    const data = await Member.findById(_id);
    res.json({ info: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Change basic info route
router.put("/changeinfo", memberMiddleware, async (req, res) => {
  const { name, email, bio, linkedinLink, contactNumber } = req.body;
  const token = req.headers.authorization;
  const { _id } = JWT.decode(token);
  try {
    await Member.findByIdAndUpdate(_id, {
      name,
      email,
      bio,
      linkedinLink,
      contactNumber,
    });
    res.json({ message: "Changed info successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Change password route
router.put("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await Member.findOne({ email });
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

// Delete member in case you want to leave club
router.delete("/delete", memberMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const { _id } = JWT.decode(token);
  try {
    await Member.findByIdAndDelete(_id);
    res.json({ message: "You have successfully deleted your account" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete member" });
  }
});

module.exports = router;
