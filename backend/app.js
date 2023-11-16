const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.get("/test", (req, res) => {
    res.send("Server is running.");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});