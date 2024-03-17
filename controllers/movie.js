const { z } = require("zod");

const Movie = require("../models/movie");

const movieSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  language: z.string(),
  genre: z.string(),
  releaseDate: z.string(),
  runtime: z.string(),
  movieImgUrl: z.string(),
  certificate: z.string(),
});

const handleCreateMovie = async (req, res) => {
  const movieData = req.body;
  console.log(req.file);
  console.log(movieData);
  try {
    const validatedData = movieSchema.parse({
      ...movieData,
      movieImgUrl: req.file.path,
    });
    console.log(validatedData);
    const data = await Movie.create(validatedData);
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    // Extract error messages from Zod error object
    // const errorMessage = error.errors
    //   .map((err) => {
    //     console.log(err);
    //     return err.message;
    //   })
    //   .join(", ");
    console.log(error);
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

const handleGetMovies = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const LIMIT = 8;

  const skip = (page - 1) * LIMIT;
  try {
    const movies = await Movie.find({}).skip(skip).limit(LIMIT);
    return res.status(200).json({ status: "success", data: movies });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error });
  }
};

const handleGetMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findById(id);
    return res.status(200).json({ status: "success", data: movies });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error });
  }
};

const handleDeleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: "success", data: "Movie deleted successfully" });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error });
  }
};

module.exports = {
  handleCreateMovie,
  handleGetMovies,
  handleGetMovie,
  handleDeleteMovie,
};
