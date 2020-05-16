((exports) => {
    exports.PATH = __dirname + "/AvatarUploads/";

    exports.ENDPOINT = 'localhost:5000';
    exports.SLICE_SIZE = 100000;

    exports.pages = { USERS: 0, CHAT: 1 };
    exports.iceBreakers = { NONE: 0, FIGHT: 1, TRAP: 2 };

    exports.FIGHT_MAX_ROUNDS = 9;
    exports.fightOptions = { PUNCH: 0, TACKLE: 1, KICK: 2 };

    exports.msgTypes = { TEXT: 0, CE_FIGHT: 1, CE_TRAP: 2 }

})(typeof exports === 'undefined' ? this['Consts'] = {} : exports);