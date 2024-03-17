const express = require("express");
const router = express.Router();

const {
  handleGetTheater,
  handleGetTheaterById,
  handleCreateTheater,
} = require("../controllers/theater");

router.get("/all-theaters", handleGetTheater);
router.get("/theater/:id", handleGetTheaterById);
router.post("/create-theater", handleCreateTheater);

module.exports = router;
