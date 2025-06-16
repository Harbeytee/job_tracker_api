import express, { Request, Response } from "express";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//static files
app.use(express.static("./public"));

//routers
const baseRouter = require("./routes/index");
const configRoutes = require("./routes/config");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//routes
app.use("/api/v1", baseRouter);
app.use("/", configRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
