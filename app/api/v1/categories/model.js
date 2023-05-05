const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Category name must be at least 3 characters"],
      maxlength: [
        20,
        "The maximum length of category name is 20 characters",
      ],
      required: [true, "The category name is required"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
