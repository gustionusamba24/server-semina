const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderDetailSchema = new Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Ticket type is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "Please provide firstName"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Please provide lastName"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Please provide email"],
      },
      role: {
        type: String,
        default: "Designer",
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    historyEvent: {
      title: {
        type: String,
        required: [true, "Title is required"],
        minlength: 3,
        maxlength: 50,
      },
      date: {
        type: Date,
        required: [true, "date and time are required"],
      },
      about: {
        type: String,
      },
      tagline: {
        type: String,
        required: [true, "Tagline is required"],
      },
      keyPoint: {
        type: [String],
      },
      venueName: {
        type: String,
        required: [true, "Venue name is required"],
      },

      image: {
        type: mongoose.Types.ObjectId,
        ref: "Image",
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      talent: {
        type: mongoose.Types.ObjectId,
        ref: "Talent",
        required: true,
      },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Organizer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
