const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
var cors = require('cors');
require("./utils/db");
 
const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use("/api", userRoutes);

// app.use(express.json({ limit: '40mb' }));

// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.listen(5000, () => {
    console.log('Server is running on port 3000.');
});