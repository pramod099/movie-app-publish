// Import mongoose
const mongoose = require("mongoose");

// Connect to database
mongoose.connect(
  "mongodb+srv://pramodsaji94:9duJbTbtvNOPbC8N@cluster0.gjkmwar.mongodb.net/?retryWrites=true&w=majority"
);

// Schema
const Schema = mongoose.Schema;

// Create Movie Schema
var movieSchema = new Schema({
  name: String,
  actor: String,
  actress: String,
  director: String,
  releasedyear: Number,
  camera: String,
  producer: String,
  language: String,
});

var movieInfo = mongoose.model("movies", movieSchema);

module.exports = movieInfo;
