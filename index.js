const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// complile schema to model that gives a class
const Course = new mongoose.model("Course", courseSchema);

const createCourse = async () => {
  // create an object based on model class
  const course = new Course({
    name: "The Complete Node.js Course",
    author: "Hisan",
    price: 300,
    tags: ["coding", "learn"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // lt (less than)
  // gte
  // lte
  // in
  // nin

  const courses = await Course
    //  .find({ author: "Hisan" })
    // .find({ price: 300 })
    // .find({ price: { $gt: 300, $lt: 550 } })
    .find({ price: { $in: [300, 500] } })
    .limit(10)
    .sort({ name: 1 });
  console.log(courses);
};

// createCourse();
getCourses();
