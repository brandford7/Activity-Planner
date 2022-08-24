import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add a password"] },
  },
  { timestamp: true }
);

export default mongoose.model("User", userSchema);
