/*
  server.js

  This file initializes the Express server, sets up middleware, defines routes,
  and establishes a WebSocket connection using Socket.IO.

  Dependencies:
  - express: Web application framework for Node.js.
  - body-parser: Middleware for parsing HTTP request bodies.
  - cors: Middleware for enabling Cross-Origin Resource Sharing.
  - http: HTTP server module.
  - socket.io: Library for real-time, bidirectional communication between web clients and servers.
*/

// Importing required modules and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const matchRoutes = require("./routes/matchRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const logRoutes = require("./routes/logRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Establishing a connection to the database
require("./utils/db");

// Creating an Express application
const app = express();

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Configuring body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Registering routes for various API endpoints
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", matchRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);
app.use("/api", reportRoutes);
app.use("/api", logRoutes);

// Creating an HTTP server using the Express app
const server = http.createServer(app);

// Creating a WebSocket server using Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Handling WebSocket connections
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    // Handling room joining
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    // Handling message sending and acknowledgment
    socket.on("send_message", (data, ackCallback) => {
        console.log("Data: ", data);
        ackCallback(data);

        // Broadcasting the message to the room
        socket.to(data.room).emit("receive_message", data, () => {
            console.log("Acknowledgment from client received");
        });
    });

    // Handling user disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});

// Starting the HTTP server on port 5000
server.listen(5000, () => {
    console.log('Server is running on port 5000.');
});