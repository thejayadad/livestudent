const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    grade: {type: Number, required: true},
    favsub: {type: String, required: true},

})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;