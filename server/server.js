// node imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

// create express app
const app = express();

// parsing data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet()); //set standard http headers for security
app.use(compression()); // compress data

// add header to all responses - allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// TODO: IMPLEMENT ROUTES

// route not found
app.use("/", (req, res, next) => {
  res.status(404).json({ message: "route not found" });
});

// handling errors
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({ message });
});

// start server
app.listen(process.env.PORT || 3000);
