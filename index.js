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

const createCourse = async () => {
  // create an object based on model class
  const course = new Course({
    name: "Artificial intelligence and 21st century",
    author: "Aravind",
    tags: ["computer science", "ai"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  const courses = await Course.find();
  console.log(courses);
};

// createCourse();
getCourses();
