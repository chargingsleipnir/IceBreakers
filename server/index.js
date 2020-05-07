const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { AddUser, UploadImage, RemoveUser, GetUser, GetUsers } = require('./users.js');

// VARIABLES -----
const PORT = process.env.PORT || 5000;

// SOCKET CONNECTION -----
io.on("connection", (socket) => {
    console.log(`Socket connection established: ${socket.id}`);

    // "ext" is not just the extension of the user's image, but acting as an indicator as to whether or not the user even did upload one.
    socket.on('AddUser', ({ name, ext }, Callback) => {
        const user = AddUser({ id: socket.id, name, ext });

        if(!user)
            console.log("Username is taken");
        else
            socket.broadcast.emit("RecNewUser", user);

        Callback();
    });

    socket.on('ImageUploadSlice', (data) => {
        UploadImage(socket, data);
    });

    socket.on('GetUsers', (data, CB) => {
        CB(GetUsers(socket.id));
    });

    // socket.on('ImageDownload', (ofSocketID) => {
    //     DownloadImage(socket, ofSocketID);
    // });

    // socket.on('join', ({ name, room }, Callback) => {
    //     const { error, user } = addUser({ id: socket.id, name, room });

    //     if(error) return Callback(error);

    //     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}`});
    //     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined. `})
    //     socket.join(user.room);

    //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    //     Callback();
    // });

    socket.on('sendMessage', ( message, Callback ) => {
        const user = GetUser(socket.id);

        //console.log(`Sending room: "${user.room}" received msg: "${message}"`);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        Callback();
    });

    socket.on("disconnect", () => {
        console.log(`Socket connection removed: ${socket.id}`);
        const user = RemoveUser(io, socket);

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