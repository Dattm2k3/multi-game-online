const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on("connection", socket => {

    console.log("User joined:", socket.id);

    socket.on("roll-dice", () => {

        // random xúc xắc server → sync toàn bộ client
        let d1 = Math.floor(Math.random()*6) + 1;
        let d2 = Math.floor(Math.random()*6) + 1;
        let d3 = Math.floor(Math.random()*6) + 1;

        io.emit("dice-result", {
            d1, d2, d3,
            total: d1 + d2 + d3
        });
    });

    socket.on("disconnect", () => {
        console.log("User left:", socket.id);
    });

});

http.listen(process.env.PORT || 3000, () => {
    console.log('Server đang chạy...');
});
