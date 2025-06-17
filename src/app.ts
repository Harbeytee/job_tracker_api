import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//static files
app.use(express.static("./public"));

//routers
import baseRoutes from "./routes/index";
import configRoutes from "./routes/config";

//error handlers
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

//routes
app.use("/api/v1", baseRoutes);
app.use("/", configRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
