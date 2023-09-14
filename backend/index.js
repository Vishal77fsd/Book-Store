import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1 : Allow All Origins with default Of Cors(*)
app.use(cors());
// Option 2 : Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
