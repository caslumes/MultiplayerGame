const express = require("express");
const http = require("http");
const { default: createGame } = require("./public/game");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static("public"));

const game = createGame();

game.subscribe((command) => {
    console.log(`Emitting ${command.type}`);
    sockets.emit(command.type, command);
});

game.addFruit({ fruitId: "lucas", fruitX: 1, fruitY: 1 });

sockets.on("connection", (socket) => {
    const playerId = socket.id;
    console.log(`Player ${playerId} connected on server.`);

    game.addPlayer({ playerId });

    socket.emit("setup", game.state);

    socket.on("disconnect", (socket) => {
        console.log(`Player ${playerId} disconnected from server.`);
        game.removePlayer({ playerId });
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
