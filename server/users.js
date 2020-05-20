const { GetImage, RemoveImage } = require('./imageHdlr.js');

const users = [];

class User {
    constructor(id, name, imgExt, imgIsPortrait) {
        this.id = id || '', 
        this.name = name || '',
        this.imgExt = imgExt || '',
        this.imgSrc = null,
        this.isPortrait = imgIsPortrait,
        this.likeThem = false,
        this.likesMe = false,
        this.unreadMsg = false,
        this.disableSend = false,
        this.messages = [],
        this.chatEvent = null,
        this.chatEventDisp = false;
    }
}

const AddUser = ({ id, name, ext, isPortrait }) => {

    //console.log(`Adding user id: "${id}", name: "${name}"`);
    const existingUser = users.find((user) => user.id === id);
    if(existingUser) {
        return null;
    }

    // Create user
    const user = new User(id, name, ext, isPortrait);
    users.push(user);

    if(ext)
        user.imgSrc = GetImage(user.id, user.imgExt);

    return user;
};

const RemoveUser = (socketID) => {
    const index = users.findIndex((user) => user.id === socketID);
    if(index === -1) {
        console.log(`Could not find (to remove) user id: ${socketID}`);
        return;
    }

    // Remove this player, 
    const userRemoved = users.splice(index, 1)[0];

    // Remove posted image
    if(userRemoved.imgExt)
        RemoveImage(userRemoved.id + '.' + userRemoved.imgExt);
};

const GetUsers = (excludeId) => {
    let retArr = users.slice();

    const removeIndex = users.findIndex((user) => user.id === excludeId);
    retArr.splice(removeIndex, 1);

    return retArr;
};

module.exports = { AddUser, RemoveUser, GetUsers };