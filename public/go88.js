const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("room") || "default";

socket.emit("join-room", roomID);

socket.on("dice-result", data => {
    animateDice("d1", data.d1);
    animateDice("d2", data.d2);
    animateDice("d3", data.d3);

    document.getElementById("resultArea").innerHTML = 
        "Tổng: " + data.total + " → " + (data.total <= 10 ? "XỈU" : "TÀI");
});

function animateDice(id, value){
    let el = document.getElementById(id);
    el.classList.add("spin");
    el.src = "/img/dice-" + value + ".png";
    setTimeout(()=> el.classList.remove("spin"), 500);
}

function sendRoll(){
    socket.emit("roll-dice-room", roomID);
}
