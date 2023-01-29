const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const Student = require("./models/Student");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);

mongoose.connect(uri, {useNewUrlParser: true})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB db connected successfully");
})

const kids = new Student({
    firstname: "Jason",
    lastname: "DaGoat",
    grade: 10,
    favsub: "Math"

})
kids.save().then(kids => {
    console.log(kids)
})
.catch(e => {
    console.log(e);
})


app.listen(5000, () => {
    console.log("Up and going on port 3200");
})