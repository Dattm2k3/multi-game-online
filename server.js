io.on("connection", socket => {

    console.log("User joined:", socket.id);

    // người chơi join room
    socket.on("join-room", roomID => {
        socket.join(roomID);
        console.log(socket.id, "joined", roomID);
    });

    // tạo phòng mới
    socket.on("create-room", () => {
        let roomID = "R" + Math.floor(Math.random()*100000);
        socket.join(roomID);
        socket.emit("room-created", roomID);
        console.log("Room created:", roomID);
    });

    // xúc xắc theo từng phòng
    socket.on("roll-dice-room", roomID => {
        let d1 = Math.floor(Math.random()*6) + 1;
        let d2 = Math.floor(Math.random()*6) + 1;
        let d3 = Math.floor(Math.random()*6) + 1;

        io.to(roomID).emit("dice-result", {
            d1, d2, d3,
            total: d1 + d2 + d3
        });
    });

    socket.on("disconnect", () => {
        console.log("User left:", socket.id);
    });

});
