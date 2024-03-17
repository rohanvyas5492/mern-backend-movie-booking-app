const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Now Playing", "Upcoming"],
      default: "Upcoming",
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    runtime: {
      type: String,
      required: true,
    },
    movieImgUrl: {
      type: String,
      rrquired: true,
    },
    certificate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = model("movie", movieSchema);

module.exports = Movie;
