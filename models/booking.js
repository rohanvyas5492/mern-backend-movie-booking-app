const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    movieScheduleId: {
      type: Schema.Types.ObjectId,
      ref: "movieSchedule",
    },
    seatsBooked: {
      type: [String],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = model("booking", bookingSchema);

module.exports = Booking;
