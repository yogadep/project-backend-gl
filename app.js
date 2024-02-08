const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const bodyParser = require("body-parser");
const cors = require('cors');
const produkRouter = require("./routes/produk");
const usersRouter = require("./routes/users");
const orderRouter = require("./routes/order");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

app.use("/produk", produkRouter);
app.use("/users", usersRouter);
app.use("/order", orderRouter);

module.exports = app;
