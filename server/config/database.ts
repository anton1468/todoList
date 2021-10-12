import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

export default connectDB;
