require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect DB
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authUser=require("./middleware/authentication")

// routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authUser, jobsRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("db connection established");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
