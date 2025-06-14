import app from './app';
import config from './config/config'
const connectDB = require('./config/db/connect')

const port = config.PORT

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
