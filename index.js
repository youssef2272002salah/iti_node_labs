const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(express.json());

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8"),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => {
  mongoose
    .connect("mongodb://localhost:27017/iti-zag")
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Connected to MongoDB");
      console.log(err);
    });
  console.log("✅✅ Server is running on Port:3000");
});
