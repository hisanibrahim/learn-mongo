const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// complile schema to model that gives a class
const Course = new mongoose.model("Course", courseSchema);

// create an object based on model class
const course = new Course({
  name: "Introduction to common sense",
  author: "Hisan",
  tags: ["life", "knowledge"],
  isPublished: true,
});
