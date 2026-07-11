import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Career title is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    averageSalary: {
      type: String,
      required: [true, "Average salary is required"],
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    futureScope: {
      type: String,
      required: [true, "Future scope is required"],
      trim: true,
    },

    roadmap: [
      {
        type: String,
        trim: true,
      },
    ],

    learningResources: [
      {
        title: {
          type: String,
          trim: true,
        },
        type: {
          type: String,
          enum: ["YouTube", "Course", "Website", "Documentation", "Book"],
        },
        url: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;