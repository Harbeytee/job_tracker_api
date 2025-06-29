import app from "./app";
import agenda from "./config/agenda";
import config from "./config/config";
import connectDB from "./config/db/connect";

const port = config.port;

const start = async () => {
  try {
    await connectDB();
    await agenda.start();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
