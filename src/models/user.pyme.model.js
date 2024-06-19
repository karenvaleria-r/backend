const mongoose = require("mongoose");

const pymeSchema = mongoose.Schema({
    fullName: String,
    rut: String,
    region: String,
    email: String,
    password: String,
    gender: String,
    birthdate: Date,
    active: Boolean,
    avatar: String,
    nameCompany: String,
    improvement: [String],
    descriptionPyme: String
});

const Pyme = mongoose.model("Pyme", pymeSchema);

module.exports = Pyme;
