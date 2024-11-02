require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");   
const testRoute = require("./routes/test");
const automataRoute = require("./routes/automata");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/test", testRoute);
app.use("/automata", automataRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server first, then connect to MongoDB
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  
  // Connect to MongoDB after server starts
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("Could not connect to MongoDB:", err);
      // Don't exit process, just log the error
    });
});
