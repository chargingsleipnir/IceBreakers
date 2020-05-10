const { GetImage, RemoveImage } = require('./imageHdlr.js');

const users = [];

const ClientUser = function(id, name, imgSrc) {
    return {
        id: id || '', 
        name: name || '', 
        imgSrc: imgSrc || null, 
        likesMe: false,
        unreadMsg: false,
        messages: []
    };
}

const AddUser = ({ id, name, ext }) => {

    //console.log(`Adding user id: "${id}", name: "${name}"`);
    const existingUser = users.find((user) => user.id === id);
    if(existingUser) {
        return null;
    }

    // Create user
    const user = { 
        id,
        name, 
        imgExt: ext, 
        matchReqsIn: [], 
        matchReqsOut: [], 
        matchChatID: -1,
        chatMap: {}
    };
    users.push(user);

    
    let imgSrc = null;
    if(ext) {
        imgSrc = GetImage(user.id, user.imgExt);
    }

    // Return user shorthand, all that's needed for the client.
    return new ClientUser(id, name, imgSrc);
};

const RemoveUser = (socketID) => {
    const index = users.findIndex((user) => user.id === socketID);
    if(index === -1) {
        console.log(`Could not find (to remove) user id: ${socketID}`);
        return;
    }

    // Remove this player, 
    const user = users.splice(index, 1)[0];

    // Remove posted image
    if(user.imgExt)
        RemoveImage(user.id + '.' + user.imgExt);

    //console.log(user)

    let chatPtnrID = -1;

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
            chatPtnrID = users[i].id;
        }
    }

    return chatPtnrID;
};

const GetUser = (id) =>  {
    const user = users.find((user) => user.id === id);
    let imgSrc = null;
    if(user.imgExt) {
        imgSrc = GetImage(user.id, user.imgExt);
    }
    return new ClientUser(user.id, user.name, imgSrc);
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

            retArr.push(new ClientUser(users[i].id, users[i].name, imgSrc));
        }
    }

    return retArr;
};

const LikeUserToggle = (thisUserID, otherUserID) =>  {
    let thisUser = null;
    let otherUser = null;

    for(user of users) {
        if(user.id == thisUserID)
            thisUser = user;
        else if(user.id == otherUserID)
            otherUser = user;
    }

    if(thisUser === null || otherUser === null) {
        console.log(`One of the users is no longer active & cannot be liked. UserID ${thisUserID} is ${thisUserID}, and the other UserID ${otherUserID} is ${otherUserID}.`);
        return null;
    }

    //matchReqsIn: [], matchReqsOut: [], matchChatID: -1
    let idIndex = thisUser.matchReqsOut.indexOf(otherUserID);

    // "I" didn't like "them" previously
    if(idIndex === -1) {
        // now I do.
        thisUser.matchReqsOut.push(otherUserID);
        otherUser.matchReqsIn.push(thisUserID);
        // "They" already liked me,
        // if(thisUser.matchReqsIn.indexOf(otherUserID) > -1) {
        //     // So now we match.

        // }
        return true;
    }
    // "I" liked "them" previously
    else {
        // now I don't.
        thisUser.matchReqsOut.splice(idIndex, 1);
        idIndex = otherUser.matchReqsIn.indexOf(thisUserID);
        otherUser.matchReqsIn.splice(idIndex, 1);
        // "They" already liked me,
        // if(thisUser.matchReqsIn.indexOf(otherUserID) > -1) {
        //     // So we no longer match.
            
        // }
        return false;
    }
};

const LogMessage = (socketID, msgData) => {
    let sendUser = null;
    let recUser = null;

    for(user of users) {
        if(user.id == socketID)
            sendUser = user;
        else if(user.id == msgData.chatPtnrID)
            recUser = user;
    }

    if(!sendUser || !recUser) {
        console.warn("One of these users has been removed, cannot log message.");
        return false;
    }

    // Update the messages for myself...
    if(!sendUser.chatMap[recUser.id])
        sendUser.chatMap[recUser.id] = [];

    sendUser.chatMap[recUser.id].push(msgData.msgText);

    // And the other user
    if(!recUser.chatMap[sendUser.id])
        recUser.chatMap[sendUser.id] = [];

    recUser.chatMap[sendUser.id].push(msgData.msgText);

    return true;
};

module.exports = { AddUser, RemoveUser, GetUser, GetUsers, LikeUserToggle, LogMessage };