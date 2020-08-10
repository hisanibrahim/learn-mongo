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

const getCourses = async (id) => {
  const courses = await Course.find({ _id: id });
  console.log(courses);
};

const updateCourse = async (id) => {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        price: 5000,
      },
    }
  );

  console.log(result);
};

// createCourse();
// getCourses("5f2d2dd44136e63d30bd6759");
updateCourse("5f2d2dd44136e63d30bd6759");
