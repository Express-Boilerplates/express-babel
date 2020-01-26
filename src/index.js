import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import employeeRoutes from "routes/employeeRoutes";
import errorHandler from "errorhandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(errorHandler());

mongoose
  .connect(
    "mongodb+srv://shoaib:shoaib@cluster0-zob4k.mongodb.net/Intensive?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(`MongoDB has been connected`);
  })
  .catch(err => console.log(`An error has been occurred`, err));

app.use("/api/employee", employeeRoutes);
app.all("/api/*", (_, res) => {
  res.status(404).json({
    message: "Invalid api route"
  });
});

app.all("*", async (req, res, next) => {
  return res.send(path.resolve(__dirname, "public", "index.html"));
});
app.listen(4343, () =>
  console.log(`Server is running on http://localhost:4343`)
);
