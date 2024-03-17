const express = require("express");
const multer = require("multer");

const router = express.Router();
const {
  handleCreateMovie,
  handleGetMovies,
  handleGetMovie,
  handleDeleteMovie,
} = require("../controllers/movie");

//For uploading files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all-movies", handleGetMovies);

router.get("/movie/:id", handleGetMovie);

router.post("/create-new", upload.single("movieImgUrl"), handleCreateMovie);

router.delete("/movie/:id", handleDeleteMovie);

module.exports = router;
