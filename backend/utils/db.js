const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/matcher-app-db");

const db = mongoose.connection;

db.on("error", (err)=>{
    console.log("Failed to connect with db.");
});

db.once("open", ()=>{
    console.log("Connect with db.");
});