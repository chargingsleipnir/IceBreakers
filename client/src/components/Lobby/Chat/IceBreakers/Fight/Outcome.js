import React from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../../../Consts';

// import imgPunch from '../../../../../images/Punch_02_32x32.png';
// import imgTackle from '../../../../../images/Tackle_01_32x32.png';
// import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightOutcome = ({ message: { fromSelf, data}, chatPtnrName }) => {
    // data = { step, msgProvoke, msgWin, msgLose }

    if(data.step === Consts.fightSteps.INIT) {
        return (
            fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue text-center fromAdmin">
                        <div className="messageText text-white">You challenged {chatPtnrName} to a fight:</div>
                        <div className="messageText text-white">{ReactEmoji.emojify(data.msgProvoke)}</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue text-center fromAdmin">
                        <div className="messageText text-white">{chatPtnrName} challenged you to a fight:</div>
                        <div className="messageText text-white">{ReactEmoji.emojify(data.msgProvoke)}</div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.fightSteps.CANCEL) {
        return (
            fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue text-center fromAdmin">
                        <div className="messageText text-white">You wimped out.</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue text-center fromAdmin">
                        <div className="messageText text-white">{chatPtnrName} wimped out.</div>
                    </div>
                </div>
            )
        );
    }
    else return "";
};

export default IBFightOutcome;