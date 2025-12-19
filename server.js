const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static website
app.use(express.static('public'));

// Default homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Lobby page fix
app.get("/lobby", (req, res) => {
    res.sendFile(__dirname + "/public/lobby.html");
});

// Tài xỉu page fix
app.get("/taixiu", (req, res) => {
    res.sendFile(__dirname + "/public/taixiu.html");
});

// SOCKET IO
io.on("connection", socket => {

    socket.on("join-room", room => {
        socket.join(room);
    });

    socket.on("roll-dice-room", room => {
        let d1 = Math.floor(Math.random()*6) + 1;
        let d2 = Math.floor(Math.random()*6) + 1;
        let d3 = Math.floor(Math.random()*6) + 1;

        io.to(room).emit("dice-result", {
            d1, d2, d3,
            total: d1+d2+d3
        });
    });

});

http.listen(process.env.PORT || 3000, () => {
    console.log("SERVER ĐANG CHẠY...");
});
