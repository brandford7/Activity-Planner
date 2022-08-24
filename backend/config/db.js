import mongoose from "mongoose";
import colors from "colors";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(`MONGODB connected: ${conn.connection.host}` .cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
