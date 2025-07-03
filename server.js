const express = require("express");
const http = require("http");
const { default: createGame } = require("./public/game");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const sockets = socketio(server)

app.use(express.static("public"));

const game = createGame();

game.addPlayer({ playerId: "lucas", playerX: 0, playerY: 0 });
game.addPlayer({ playerId: "lucas2", playerX: 5, playerY: 0 });
game.addFruit({ fruitId: "lucas", fruitX: 1, fruitY: 1 });

sockets.on('connection',(socket)=>{
    const playerId = socket.id
    console.log(`Player ${playerId} connected on server.`)

    socket.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
