import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

export class DbConnection {
  private dbUrl: string;
  constructor() {
    this.dbUrl = DATABASE_URL as string;
  }

  async connectToMongoDb() {
    try {
      mongoose.connect(this.dbUrl);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${this.dbUrl}`);
    });

    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });

    return;
  }

  async closeDbConnection() {
    const dbConnection = mongoose.connection;

    dbConnection.on("close", () => {
      console.log("database is closed");
    });
  }
}
