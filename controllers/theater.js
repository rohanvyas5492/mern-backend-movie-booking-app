const { z } = require("zod");
const Theater = require("../models/theater");

const theaterSchema = z.object({
  name: z.string(),
  location: z.string(),
  address: z.string(),
  contactInfo: z.string(),
});

const handleGetTheater = async (req, res) => {
  try {
    const theaters = await Theater.find({});
    return res.status(200).json({ status: "success", data: theaters });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error });
  }
};

const handleGetTheaterById = async (req, res) => {
  const id = req.params.id;
  try {
    const theater = await Theater.findById(id);
    return res.status(400).json({ status: "success", data: theater });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error });
  }
};

const handleCreateTheater = async (req, res) => {
  const theater = req.body;
  console.log(theater);

  try {
    const validatedData = theaterSchema.parse(theater);
    const data = await Theater.create(validatedData);
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error });
  }
};

module.exports = {
  handleGetTheater,
  handleGetTheaterById,
  handleCreateTheater,
};
