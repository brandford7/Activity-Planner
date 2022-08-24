import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    text: { type: String, required: [true, "Please add a text"] },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
