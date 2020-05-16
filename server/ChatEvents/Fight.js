
module.exports = () => {
    return {
        SetupNetworkResponses: (io, socket) => {
            socket.on('CommenceFight', ( data ) => {

                socket.emit('RecMessage', { ...data, fromSelf: true })
                io.to(data.chatPtnrID).emit('RecMessage', { ...data, chatPtnrID: socket.id, fromSelf: false });
            });
        }
    };
};