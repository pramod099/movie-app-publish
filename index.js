// Import Express
const express = require("express");
const path = require("path");

// Import movieInfo model
const MovieInfo = require("./model/movieDb");

// Initialize Express
const app = new express();

// Parsing Body Parameter
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type "
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Setting PORT number
app.listen(5001, () => {
  console.log("Server is running in port 5001");
});

// View all movies
app.get("/api", async (req, res) => {
  try {
    let movieDetailList = await MovieInfo.find();
    res.json(movieDetailList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a movie
app.post("/api/add", (req, res) => {
  try {
    let movieDetail = new MovieInfo(req.body);
    movieDetail.save();
    res.send("Added");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update movie details
app.post("/api/update", async (req, res) => {
  try {
    let movieDetail = await MovieInfo.findByIdAndUpdate(req.body._id, req.body);
    res.send("Updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete movie details
app.post("/api/delete", async (req, res) => {
  try {
    let movieDetail = await MovieInfo.findByIdAndDelete(req.body._id);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search by text on all fields except for 'Release Year'
app.get("/api/search", async (req, res) => {
  try {
    let movieDetailList = await MovieInfo.find({
      $or: [
        { name: { $regex: req.query.text, $options: "i" } },
        { actor: { $regex: req.query.text, $options: "i" } },
        { actress: { $regex: req.query.text, $options: "i" } },
        { director: { $regex: req.query.text, $options: "i" } },
        { camera: { $regex: req.query.text, $options: "i" } },
        { producer: { $regex: req.query.text, $options: "i" } },
        { language: { $regex: req.query.text, $options: "i" } },
      ],
    });
    res.json(movieDetailList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Front-End buid
app.use(express.static(path.join(__dirname, "/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
