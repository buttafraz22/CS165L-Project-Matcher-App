const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cors = require('cors');

require("./utils/db");
 
const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", profileRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 3000.');
});