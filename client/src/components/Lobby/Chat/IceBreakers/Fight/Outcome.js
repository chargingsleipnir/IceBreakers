import React from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../../../Consts';

import imgPunch from '../../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightOutcome = ({ message: { fromSelf, data}, chatPtnrName }) => {

    const GetImage = (action) => {
        if(action === Consts.fightRoundActions.PUNCH)
            return imgPunch;
        else if(action === Consts.fightRoundActions.TACKLE)
            return imgTackle;
        else if(action === Consts.fightRoundActions.KICK)
            return imgKick;
    }

    // "Self" - the person who sent these messages, is the fight responder
    const GetRoundResultMessage = (roundWinner) => {
        if(roundWinner === Consts.fightWinner.SENDER)
            return fromSelf ? "Ouch!" : "Nice!";
        else if(roundWinner === Consts.fightWinner.RESPONDER)
            return fromSelf ? "Nice!" : "Ouch!";
        else if(roundWinner === Consts.fightWinner.TIE)
            return "Oof...";
    }

    // "Self" - the person who sent these messages, is the fight responder
    const GetFightResultMessage = (fightWinner) => {
        if(fightWinner === Consts.fightWinner.SENDER)
            return fromSelf ? `${chatPtnrName} won!` : `You beat ${chatPtnrName}!`;
        else if(fightWinner === Consts.fightWinner.RESPONDER)
            return fromSelf ? `You beat ${chatPtnrName}!` : `${chatPtnrName} won!`;
        else if(fightWinner === Consts.fightWinner.TIE)
            return "We have a tie!";
    }

    if(data.step === Consts.fightSteps.INIT) {

        const msg = fromSelf ? `You challenged ${chatPtnrName} to a fight!` : `${chatPtnrName} challenged you to a fight!`;
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">{msg}</div>
                    <div className="messageText text-white">"{ReactEmoji.emojify(data.msgProvoke)}"</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.fightSteps.ACCEPT) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">Challenge accepted!</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.fightSteps.CANCEL) {
        
        const msg = fromSelf ? `You wimped out.` : `${chatPtnrName} wimped out.`;
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">{msg}</div>
                </div>
            </div>
        );
    }
    // roundWinner
    // actionSent
    // actionResp
    else if(data.step === Consts.fightSteps.ACT) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox fullW bgLightBlue fromAdmin">
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        {/* In this case, "self", the person who sent the message, is the action Responder */}
                        <div className="bg-warning mr-3">
                            <img src={GetImage(data[fromSelf ? "actionSent" : "actionResp"])} alt="action" className="m-1" />
                        </div>
                        <div className="mr-3 text-white">
                            {GetRoundResultMessage(data.roundWinner)}
                        </div>
                        <div className="bg-warning">
                            <img src={GetImage(data[fromSelf ? "actionResp" : "actionSent"])} alt="action" className="m-1" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // fightWinner
    // msgEnd will be either: msgWin or msgLose or msgTie, as setup by sender
    else if(data.step === Consts.fightSteps.END) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">{GetFightResultMessage(data.fightWinner)}</div>
                    <div className="messageText text-white">"{ReactEmoji.emojify(data.msgEnd)}"</div>
                </div>
            </div>
        );
    }
    else return "";
};

export default IBFightOutcome;