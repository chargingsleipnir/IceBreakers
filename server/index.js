const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { AddUser, RemoveUser, GetUser, GetUsers, LikeUserToggle, LogMessage } = require('./users.js');
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

    socket.on('LikeUserToggle', (userID, CB) => {
        const otherUserLiked = LikeUserToggle(socket.id, userID);
        CB(otherUserLiked);

        io.to(userID).emit("RecLikeToggle", { socketID: socket.id, likesMe: otherUserLiked });
    });

    // socket.on('join', ({ name, room }, Callback) => {
    //     const { error, user } = addUser({ id: socket.id, name, room });

    //     if(error) return Callback(error);

    //     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}`});
    //     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined. `})
    //     socket.join(user.room);

    //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    //     Callback();
    // });

    socket.on('ImageUploadSlice', (data) => {
        UploadImage(socket.id, data, (slice) => {
            if(slice === -1)
                socket.emit('ImageUploadError');
            else if(slice === 0)
                socket.emit('ImageUploadEnd'); 
            else
                socket.emit('ImageReqSlice', { currentSlice: slice });
        });        
    });

    socket.on('GetMessages', ( data, Callback ) => {

    });
    socket.on('SendMessage', ( data, Callback ) => {
        const success = LogMessage(socket.id, data);

        if(success) {
            //console.log(`From user "${socket.id}" to user "${data.chatPtnrID}", sending msg: "${data.msgText}"`);
            io.to(data.chatPtnrID).emit('RecMessage', { senderID: socket.id, msgText: data.msgText });
        }

        Callback(success);
    });

    socket.on("disconnect", () => {
        console.log(`Socket connection removed: ${socket.id}`);
        RemoveUser(socket.id);

        // Have everyone remove this user from their lists.
        socket.broadcast.emit("RemoveUser", socket.id);

        // if(user) {
        //     io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        // }
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