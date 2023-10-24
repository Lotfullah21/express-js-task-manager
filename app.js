const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");
// get the connection module
const connectDB = require("./db/connect");

// get the dotenv module
require("dotenv").config();
// MiddleWares

// get the static files
app.use(express.static("./public"));

app.use(express.json()); // using this middle ware, we can have access to the data in body request. (req.body)

// Routes
app.use("/api/v2/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

app.get("/home", (req, res) => {
  res.send("HOME");
});

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_SECRETS);
    app.listen(port, console.log(`Server is listening to ${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
