const mongoose = require("mongoose");

const options = { discriminatorKey: 'userType', collection: 'users' };

const userSchema = mongoose.Schema({
    fullName: String,
    rut: String,
    region: String,
    email: String,
    password: String,
    gender: String,
    birthdate: String,
    active: Boolean,
    avatar: String
}, options);

const User = mongoose.model("User", userSchema);

const pymeSchema = User.discriminator('Pyme', new mongoose.Schema({
    nameCompany: String,
    improvement: [String],
    descriptionPyme: String
}));

const coachSchema = User.discriminator('Coach', new mongoose.Schema({
    specialization: String,
    experience: String,
    certification: String,
    formation: String,
    disponibility: String,
    descriptionCoach: String
}));

module.exports = { User, Pyme: pymeSchema, Coach: coachSchema };
