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
    name: "Mongo Bootcamp",
    author: "Hisan",
    price: 1500,
    tags: ["coding", "learn"],
    isPublished: false,
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find({ author: /.*hisan.*/i, price: 2000 });
  console.log(courses);
};

const updateCourse = async (id) => {
  const course = await Course.findById(id);

  course.price = 2000;
  course.save();
  console.log(course);
};

// createCourse();
// getCourses();
updateCourse("5f2d2dd44136e63d30bd6759");
