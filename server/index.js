const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { AddUser, RemoveUser, GetUsers } = require('./users.js');
const { UploadImage } = require('./imageHdlr.js');

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

    socket.on('GetUsers', (data, CB) => {
        CB(GetUsers(socket.id));
    });

    socket.on('LikeUserToggle', (data) => {
        io.to(data.userID).emit("RecLikeToggle", { socketID: socket.id, likesMe: data.isLiked });
    });

    socket.on('ImageUploadSlice', (data) => {
        const { slice, error } = UploadImage(socket.id, data); 
        
        if(slice === -1) {
            socket.emit('ImageUploadError', error);
        }
        else if(slice === 0)
            socket.emit('ImageUploadEnd'); 
        else
            socket.emit('ImageReqSlice', { currentSlice: slice });
    });

    socket.on('SendMessage', ( data ) => {
        io.to(data.chatPtnrID).emit('RecMessage', { senderID: socket.id, msgText: data.msgText });
    });

    socket.on("disconnect", () => {
        console.log(`Socket connection removed: ${socket.id}`);
        RemoveUser(socket.id);

        // Have everyone remove this user from their lists.
        socket.broadcast.emit("RemoveUser", socket.id);
    });
});

// ROUTES -----
app.use(express.static(__dirname + '/Client'));

const router = require('./router');
app.use(router);
app.use(cors());

// SERVER CONNECTION -----
server.listen(PORT, () => {
    console.log(`${Date(Date.now())}: Server running at http://~ip~:${PORT}/`);
});