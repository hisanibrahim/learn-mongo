const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// create schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 64,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["technology"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "Course should have atleast one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = new mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Mongodb course",
    category: "technology",
    author: "Hisan",
    price: 1500,
    // tags: null,
    // tags: [],
    isPublished: true,
  });

  try {
    const result = await course.save();

    // Another way to validate without saving data
    // const result = await course.validate();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

const getCourses = async (id) => {
  const courses = await Course.find({ _id: id });
  console.log(courses);
};

const updateCourse = async (id) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        price: 8000,
      },
    },
    // This argument is for returning document after updated
    // Or it will return document before updating
    {
      new: true,
    }
  );

  console.log(result);
};

const removeCourse = async (id) => {
  // // const result = await Course.deleteMany({
  // const result = await Course.deleteOne({
  //   _id: id,
  // });

  const course = await Course.findByIdAndRemove(id);

  console.log(course);
};

createCourse();
