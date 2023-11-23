const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const matchRoutes = require("./routes/matchRoutes");

require("./utils/db");
 
const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", matchRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000.');
});