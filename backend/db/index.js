const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Connect to MongoDB
const connectDB=async()=>
{
    try
    {
        const conn=await mongoose.connect("mongodb+srv://HACKATHON_1:HACKATHON_1@cluster0.t0kal7m.mongodb.net/HACKATHON")
        console.log(`connected to Mongodb Database ${conn.connection.host}`)
    }
    catch(err){
        console.log("ERROR connnecting to db")
    }
}


// Define schemas

// member schema
const memberSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    bio: {
        type: String
    },
    linkedinLink: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    club: {
        type: Schema.Types.ObjectId,
        ref : 'Club'
    },
    password: {
        type: String,
    },
});

// student schema
const studentSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    bio: {
        type: String
    },
    linkedinLink: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    field: {
        type: Schema.Types.ObjectId,
        ref: 'Field'
    },
    password: {
        type: String,
    },
});

// club schema
const clubSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
});

// field schema
const fieldSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

// blog schema
const blogSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    club:{
        type: Schema.Types.ObjectId,
        ref: 'Club'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }
});

// mentor schema
const mentorSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    bio :{
        type: String
    },
    linkedinLink: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    field: {
        type: Schema.Types.ObjectId,
        ref: 'Field'
    },
    password: {
        type: String,
    }
});

// event schema
const eventSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    club:{
        type: Schema.Types.ObjectId,
        ref : 'Club'
    },
    date:{
        type: Date
    },
    registrationLink:{
        type: String
    }
})

// creating models using defined schema's
const Member = mongoose.model("Member", memberSchema);
const Student = mongoose.model("Student", studentSchema);
const Club = mongoose.model('Club', clubSchema);
const Field = mongoose.model('Field', fieldSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Mentor = mongoose.model('Mentor', mentorSchema);
const Event = mongoose.model('Event',eventSchema);

module.exports = {
    Member,
    Student,
    Club,
    Field,
    Blog,
    Mentor,
    Event,
    connectDB
};
