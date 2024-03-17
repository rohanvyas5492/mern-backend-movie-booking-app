// Import dependencies
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import custom modules
const { connectToDb } = require("./connection");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const theaterRouter = require("./routes/theater");

// const { checkForAuth } = require("./middlewares/auth");

// Create express app
const app = express();

// Load environment variables
dotenv.config({ path: "./config.env" });
const DB = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000; // Default port 8000 if PORT is not defined

// Connect to MongoDB
connectToDb(DB)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("assets"));
// app.use(checkForAuth);

// Routes
app.get("/", (req, res) => {
  res.send("hello from server");
  console.log(req.headers);
});

// Mount routers
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/theaters", theaterRouter);

// Start server
app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));
