require("dotenv").config();
const express = require("express");
const app = express();
const { connectWithPostgres, sequelize } = require("./connection");
const routes = require("./router");
const bodyParser = require("body-parser");
const { logging, errorHandler } = require("./middleware");
const cors = require("cors");

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// Define the CORS options
app.use(cors()); // Use the cors middleware with your options

// MiddleWare
app.use(
  logging({
    origin: process.env.ORIGINS,
  })
);

// Error Handler
app.use(errorHandler);

// Route
app.use("/api", routes);

app.listen(process.env.PORT, async (req, res) => {
  // Connetion establish
  await connectWithPostgres();
  sequelize.sync().then(() => {
    console.log("Database Connected Successfully");
  });
  // console.log('Server is working');
});
