const express = require("express");
const logger = require("morgan");

const { DB_URI } = require("./config");
require("./db")(DB_URI);

const routes = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

app.use("/", (req, res) => {
  res.json({ info: `Hey, I'm working!` });
});

// Handle non-existing route
app.use("*", (req, res) => {
  res.status(404).json({
    message: "You have landed on no man's land",
  });
});

// Global Error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    code: err.status || "error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

module.exports = app;
