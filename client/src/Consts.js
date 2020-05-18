const Consts = {
    ENDPOINT: 'localhost:5000',
    SLICE_SIZE: 100000,
    pages: { USERS: 0, CHAT: 1 },
    msgTypes: { TEXT: 0, CE_FIGHT: 1, CE_TRAP: 2 },

    iceBreakers: { NONE: 0, FIGHT: 1, TRAP: 2 },
    CE_MSG_DELAY: 750,

    FIGHT_MAX_ROUNDS: 9,
    fightOptions: { PUNCH: 0, TACKLE: 1, KICK: 2 },
    fightSteps: { INIT: 0, CANCEL: 1, ACT: 2, END: 3 }
};

export default Consts;