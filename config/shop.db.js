import mongoose from "mongoose";
import "dotenv/config";

const DB = process.env.MONGO_DB_URI;
const NODE_ENV = process.env.NODE_ENV;

if (!DB) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cachedDB = global.mongoose;

if (!cachedDB) {
  cachedDB = global.mongoose = { connection: null, promise: null };
}

const connectToDatabase = async () => {
  if (cachedDB.connection) {
    console.log("Using cached database connection.");
    return cachedDB.connection;
  }

  if (!cachedDB.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      cachedDB.promise = await mongoose.connect(DB, opts);
      console.log(
        `Connected to database successfully!!! in "${NODE_ENV}" mode`
      );

      // Handle process termination to close connections
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed due to app termination");
        process.exit(0);
      });

      return mongoose;
    } catch (error) {
      console.error("Error connecting to database", error);
      // return error;
      process.exit(1);
    }
  }

  cachedDB.connection = await cachedDB.promise;
  return cachedDB.connection;
};

export default connectToDatabase;
