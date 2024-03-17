const { Schema, model } = require("mongoose");

const movieSchedule = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "movie",
    },
    theaterId: {
      type: Schema.Types.ObjectId,
      ref: "theater",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    ticketPrice: {
      type: Nummber,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const MovieSchedule = model("movieSchedule", movieSchedule);

module.exports = MovieSchedule;
