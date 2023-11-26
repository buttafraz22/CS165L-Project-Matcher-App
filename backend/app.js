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

require("./utils/db");
 
const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", matchRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log("User connected: ",socket.id);

    socket.on("join_room", (data)=>{
        socket.join(data);
    })

    socket.on("send_message", (data, ackCallback) => {
        console.log("Data: ", data);
        ackCallback(data);
      
        socket.to(data.room).emit("receive_message", data, () => {
            console.log("Acknowledgment from client received");
        });
    });

    socket.on("disconnect", ()=>{
        console.log("User disconnected: ", socket.id);
    })
})

server.listen(5000, () => {
    console.log('Server is running on port 5000.');
});