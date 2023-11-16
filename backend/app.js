const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("./utils/db");

const app = express();

app.use(bodyParser.json());

app.use("/api", userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});