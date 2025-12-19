const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/lobby", (req, res) => {
    res.sendFile(__dirname + "/public/lobby.html");
});
app.get("/taixiu", (req, res) => {
    res.sendFile(__dirname + "/public/taixiu.html");
});

// BOT auto
function botPick(){
    return Math.random() < 0.5 ? "TAI" : "XIU";
}

setInterval(()=>{

    let d1 = Math.floor(Math.random()*6)+1;
    let d2 = Math.floor(Math.random()*6)+1;
    let d3 = Math.floor(Math.random()*6)+1;
    let total = d1+d2+d3;
    let result = total <= 10 ? "XIU" : "TAI";

    let botGuess = botPick();

    io.emit("bot-result", {
        botGuess,
        result
    });

}, 6000);

// Realtime
io.on("connection", socket => {

    socket.on("join-room", room => {
        let size = io.sockets.adapter.rooms.get(room)?.size || 0;
        if(size >= 8){
            socket.emit("room-full");
            return;
        }
        socket.join(room);
        socket.emit("joined", room);
    });

    socket.on("roll-dice-room", room => {
        let d1 = Math.floor(Math.random()*6)+1;
        let d2 = Math.floor(Math.random()*6)+1;
        let d3 = Math.floor(Math.random()*6)+1;

        io.to(room).emit("dice-result", {
            d1, d2, d3,
            total: d1+d2+d3
        });
    });

});

http.listen(process.env.PORT || 3000, () => {
    console.log("SERVER ĐANG CHẠY...");
});
