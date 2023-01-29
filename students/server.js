const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const Student = require("./models/Student");
const methodOverride = require("method-override");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);

mongoose.connect(uri, {useNewUrlParser: true})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB db connected successfully");
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

//FIRST GET ROUTE//
app.get("/", async(req, res) => {
    const students = await Student.find({})
    res.render("home", {students})
})

//DETAIL ROUTE//
app.get("/student/:id", async (req, res) => {
    const {id} = req.params;
    const students = await Student.findById(id)
    res.render("single", {students})
})

//CREATE STUDENT ROUTE//
app.get("/new", (req, res) => {
    res.render("new");
})

app.post("/students", async(req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.redirect("/");
})

//EDIT OR UPDATE ROUTE//

app.get("/students/:id/edit", async (req, res) => {
    const {id} = req.params;
    const student = await Student.findById(id);
    res.render("edit", {student})
})

app.put("/student/:id", async (req, res) => {
    const {id} = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {runValidators: false})
    res.redirect("/")
})

app.delete("/student/:id", async (req, res) => {
    const {id} = req.params;
    const deleteStudent = await Student.findByIdAndDelete(id)
    res.redirect("/")
})

app.listen(3200, () => {
    console.log("Up and going on port 3200");
})