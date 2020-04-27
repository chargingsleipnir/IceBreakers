const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// VARIABLES -----
const PORT = process.env.PORT || 5000;

// SOCKET CONNECTION -----
io.on("connection", (socket) => {
    console.log(`Socket connection established: ${socket.id}`);

    socket.on('join', ({ name, room }, Callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return Callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined. `})
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        Callback();
    });

    socket.on('sendMessage', ( message, Callback ) => {
        const user = getUser(socket.id);

        //console.log(`Sending room: "${user.room}" received msg: "${message}"`);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        Callback();
    });

    socket.on("disconnect", () => {
        console.log(`Socket connection removed: ${socket.id}`);
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        }
    });
});

// ROUTES -----
const router = require('./router');
app.use(router);
app.use(cors());

// SERVER CONNECTION -----
server.listen(PORT, () => {
    console.log(`${Date(Date.now())}: Server running at http://~ip~:${PORT}/`);
});