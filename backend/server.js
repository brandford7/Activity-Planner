import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorMiddleWare.js";
import {dbConnect} from "./config/db.js"

const port =process.env.PORT || 5000;
dotenv.config()

dbConnect()

const app = express();

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use('/api/users',userRoutes)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
