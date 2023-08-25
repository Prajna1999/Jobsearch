require("dotenv").config();
require("express-async-errors");
// security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");


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
app.set('trust proxy', true);
app.use(rateLimit(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
	  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	  legacyHeaders: false,
  }
))
app.use(express.json());
// extra packages
app.use(cors());
app.use(helmet());
app.use(xss());

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
