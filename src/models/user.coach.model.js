const mongoose = require("mongoose");

const coachSchema = mongoose.Schema({
    fullName: String,
    rut: String,
    region: String,
    email: String,
    password: String,
    gender: String,
    birthdate: Date,
    active: Boolean,
    avatar: String,
    specialization: String,
    experience: String,
    certification: String,
    formation: String,
    disponibility: String,
    descriptionCoach: String
});

const Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;
