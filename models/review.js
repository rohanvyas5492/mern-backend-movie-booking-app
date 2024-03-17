const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "movie",
    },
    theaterId: {
      type: Schema.Types.ObjectId,
      ref: "theater",
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = model("review", reviewSchema);

module.exports = Review;
