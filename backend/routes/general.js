const express = require('express');
const { Member, Student, Club, Field, Blog, Mentor,Events } = require('../db/index.js');

const router = express.Router();

router.use(express.json());

// for landing page

// 1. retrive all clubs
router.get('/clubs',async (req,res)=>{
    try{
        const allClubs = await Club.find();
        res.json({
            clubs: allClubs
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 2. retrive all field
router.get('/fields',async (req,res)=>{
    try{
        const allFileds = await Field.find();
        res.json({
            clubs: allFileds
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 3. retrive blogs of an specific club
router.get('/blogs/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const allBlogs = await Blog.find({club:id});
        res.json({
            blogs: allBlogs,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 4. Retrive all the mentors of a specific fleid
router.get('/mentors/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const allMentors = await Mentor.find({field:id});
        res.json({
            mentors : allMentors
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 5. Retrive member of specific club
router.get('/member/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const allMembers = await Member.find({club:id});
        res.json({
            members : allMembers
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 6. Retrive all events
router.get('/events',async (req,res)=>{
    try{
        const allEvents = await Events.find();
        res.json({
            clubs: allEvents
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

// 7. retrive all the student interested in a particular field
router.get('/student/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const allStudents = await Student.find({field:id});
        res.json({
            mentors : allStudents
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

module.exports = router;

