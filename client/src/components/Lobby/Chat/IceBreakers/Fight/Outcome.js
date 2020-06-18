import React from 'react';
import ReactEmoji from 'react-emoji';
import * as Consts from '../../../../../Consts';

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

    const GetRoundResult = (roundWinner) => {
        if(roundWinner === Consts.fightWinner.SENDER)
            return fromSelf ? Consts.fightOutcome.LOSE : Consts.fightOutcome.WIN;
        else if(roundWinner === Consts.fightWinner.RESPONDER)
            return fromSelf ? Consts.fightOutcome.WIN : Consts.fightOutcome.LOSE;
        else if(roundWinner === Consts.fightWinner.TIE)
            return Consts.fightOutcome.TIE;
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

        let msg = ``;
        let msgOriginRef = ``;

        if(fromSelf) {
            msg = `You challenged ${chatPtnrName} to a fight!`;
            msgOriginRef = `fromAdminOfSelf`;
        }
        else {
            msg = `${chatPtnrName} challenged you to a fight!`;
            msgOriginRef = `fromAdminOfOther`;
        }

        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="outerBox text-center">
                    <div className="messageText fontSize90 text-white">{msg}</div>
                    <div className={`messageBox messageText mt-2 ${msgOriginRef}`}>{ReactEmoji.emojify(data.msgProvoke)}</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.fightSteps.ACCEPT) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="text-center fontSize90">
                    <div className="messageText text-white">Challenge accepted!</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.fightSteps.CANCEL) {

        const msg = fromSelf ? `You wimped out.` : `${chatPtnrName} wimped out.`;
        return (
            <div className="d-flex justify-content-center mt-2 mb-3">
                <div className="text-center fontSize90">
                    <div className="messageText text-white">{ReactEmoji.emojify(msg)}</div>
                </div>
            </div>
        );
    }
    // roundWinner
    // actionSent
    // actionResp
    else if(data.step === Consts.fightSteps.ACT) {

        const result = GetRoundResult(data.roundWinner);
        let resultHighlightClass = "";
        let resultMsg = "Oof...";
        if(result === Consts.fightOutcome.WIN) {
            resultHighlightClass = "textShadowGreen";
            resultMsg = "Nice!";
        }
        else if(result === Consts.fightOutcome.LOSE) {
            resultHighlightClass = "textShadowRed";
            resultMsg = "Ouch!";
        }

        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="width80Pct">
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        {/* In this case, "self", the person who sent the message, is the action Responder */}
                        <div className="bg-warning mr-3">
                            <img src={GetImage(data[fromSelf ? "actionSent" : "actionResp"])} alt="action" className="m-1" />
                        </div>
                        <div className={`mr-3 font-weight-bold text-white ${resultHighlightClass}`}>
                            {resultMsg}
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

        // The user responding to the fighting initaited this message to be sent, but it was the other user who msgEnd belongs to, hence the reverse classes being used.
        let msgOriginRef = ``;
        if(fromSelf) {
            msgOriginRef = `fromAdminOfOther`;
        }
        else {
            msgOriginRef = `fromAdminOfSelf`;
        }

        return (
            <div className="d-flex justify-content-center mt-2 mb-3">
                <div className="outerBox text-center">
                    <div className="messageText text-white fontSize90">{GetFightResultMessage(data.fightWinner)}</div>
                    <div className={`messageText messageBox mt-2 ${msgOriginRef}`}>{ReactEmoji.emojify(data.msgEnd)}</div>
                </div>
            </div>
        );
    }
    else return "";
};

export default IBFightOutcome;