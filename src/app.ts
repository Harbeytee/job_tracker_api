import express, { Request, Response } from "express";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//static files
app.use(express.static("./public"));

//routers
const authRouter = require("./routes/auth");
const configRoutes = require("./routes/config");
const jobRoutes = require("./routes/jobs");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

//routes
app.use("/api/v1/auth", authRouter);
app.use("/", configRoutes);
app.use("/jobs", authenticationMiddleware, jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
