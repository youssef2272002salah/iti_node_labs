require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express(); // Create an Express application 

// Middleware
app.use(express.json());  // parse JSON from incoming requests and make it available in req.body
app.use(cors());

// Swagger Documentation
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8"),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Global Error Handler (MUST be last)
app.use(errorHandler);


/*

Client Request
      ↓
Route
      ↓
Validation Middleware
      ↓
Controller (asyncHandler)
      ↓
Error Thrown?
      ↓ YES
next(err)
      ↓
Express skips normal middlewares
      ↓
Global errorHandler
      ↓
Error classification
      ↓
Proper HTTP response sent

*/

// Server setup
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Failed to connect to MongoDB");
      console.log(err);
    });
  console.log(`✅✅ Server is running on Port:${PORT}`);
});
