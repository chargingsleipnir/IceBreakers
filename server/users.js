var fs = require('fs');

const users = [];

// Container for any/all images being uploaded at one time.
var uploads = {};
const PATH = __dirname + "\\AvatarUploadSpace\\";
const SLICE_SIZE = 100000;
var uploadObj = { name: null, type: null, size: 0,  data: [], slice: 0 };

const AddUser = ({ id, name, ext }) => {

    //console.log(`Adding user id: "${id}", name: "${name}"`);
    const existingUser = users.find((user) => user.id === id);
    if(existingUser) {
        return null;
    }

    // Create user
    const user = { id, name, imgExt: ext, matchReqsIn: [], matchReqsOut: [], matches: [], matchChatID: -1 };
    users.push(user);

    
    let imgSrc = null;
    if(ext) {
        imgSrc = GetImage(user.id, user.imgExt);
    }

    // Return user shorthand, all that's needed for the client.
    return { id, name, imgSrc };
};

const UploadImage = (socket, data) => {
    if(!uploads[socket.id]) {
        uploads[socket.id] = Object.assign({}, uploadObj, data);
        uploads[socket.id].data = [];
    }
    // Convert the ArrayBuffer to Buffer 
    data.data = Buffer.from(new Uint8Array(data.data)); 
    // Save the data 
    uploads[socket.id].data.push(data.data); 
    uploads[socket.id].slice++;

    // Upload complete
    if(uploads[socket.id].slice * SLICE_SIZE >= uploads[socket.id].size) { 
        const fileBuffer = Buffer.concat(uploads[socket.id].data);
        const fileName = socket.id + '.' + data.ext;

        // First, avatar image goes into open folder
        fs.writeFile(PATH + fileName, fileBuffer, (error) => {
            delete uploads[socket.id];
            if(error)
                return socket.emit('ImageUploadError');

            socket.emit('ImageUploadEnd'); 
        });                    
    }
    else { 
        socket.emit('ImageReqSlice', { currentSlice: uploads[socket.id].slice }); 
    }
};

const RemoveUser = (io, socket) => {
    const index = users.findIndex((user) => user.id === socket.id);
    if(index === -1) {
        console.log(`Could not find (to remove) user id: ${socket.id}`);
        return;
    }

    // Remove this player, 
    const user = users.splice(index, 1)[0];

    // Remove posted image
    if(user.imgExt) {
        const fileName = user.id + '.' + user.imgExt;
        fs.unlink(PATH + fileName, (err) => {
            if(err)
                console.log(err);
        });
    }

    console.log(user)

    // Go through all the users, finding matches in the removed user's lists, and removing that user from their own lists.
    for(let i = 0; i < users.length; i++) {
        let index = user.matchReqsIn.indexOf(users[i].id);
        if(index > -1) {
            let listIndex = users[i].matchReqsOut.indexOf(user.id);
            users[i].matchReqsOut.splice(listIndex, 1);
        }

        index = user.matchReqsOut.indexOf(users[i].id);
        if(index > -1) {
            let listIndex = users[i].matchReqsIn.indexOf(user.id);
            users[i].matchReqsIn.splice(listIndex, 1);
        }

        if(users[i].matchChatID == user.id) {
            users[i].matchChatID = -1;
        }
    }

    // Break off direct chat if user was engaged.
    if(user.matchChatID !== -1) {
        io.to(user.matchChatID).emit("EndChat");
    }
    
    // Have everyone remove this user from their lists.
    socket.broadcast.emit("RemoveUser", socket.id);
};

const GetImage = (socketID, imgExt) => {
    const fileName = socketID + '.' + imgExt;
    let data = fs.readFileSync(PATH + fileName);
    console.log(data);
    return "data:image/" + imgExt + ";base64,"+ data.toString("base64");
};
const GetUser = (id) =>  {
    const user = users.find((user) => user.id === id);
    let imgSrc = null;
    if(user.imgExt) {
        imgSrc = GetImage(user.id, user.imgExt);
    }
    return { id: user.id, name: user.name, imgSrc };
};
const GetUsers = (excludeId) => {
    var retArr = [];

    // Only need a little data from each user.
    for(let i = 0; i < users.length; i++) {
        if(users[i].id != excludeId) {

            let imgSrc = null;
            if(users[i].imgExt) {
                imgSrc = GetImage(users[i].id, users[i].imgExt);
            }

            retArr.push({ id: users[i].id, name: users[i].name, imgSrc });
        }
    }

    return retArr;
};


//const index = users.findIndex((user) => user.id === id);
//const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { AddUser, UploadImage, RemoveUser, GetUser, GetUsers };