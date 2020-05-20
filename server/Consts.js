((exports) => {
    exports.PATH = __dirname + "/AvatarUploads/";

    exports.ENDPOINT = 'localhost:5000';
    exports.SLICE_SIZE = 100000;

    exports.pages = { USERS: 0, CHAT: 1 };
    exports.msgTypes = { TEXT: 0, CE_FIGHT: 1, CE_TRAP: 2 };

    exports.iceBreakers = { NONE: 0, FIGHT: 1, TRAP: 2 };
    exports.CE_MSG_DELAY = 750;

    exports.FIGHT_MAX_ROUNDS = 5;
    exports.fightRoundActions = { PUNCH: 0, TACKLE: 1, KICK: 2 };
    exports.fightWinner = { SENDER: 0, RESPONDER: 1, TIE: 2 };
    exports.fightSteps = { INIT: 0, ACCEPT: 1, CANCEL: 2, ACT: 3, END: 4 };   

})(typeof exports === 'undefined' ? this['Consts'] = {} : exports);