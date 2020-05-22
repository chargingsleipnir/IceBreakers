import React from 'react';
import * as Consts from '../../../../../Consts';

import imgPunch from '../../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightEngage = ({ eventData: { fromSelf, data }, SendMessage, UpdateEventData, ClearEvent, chatPtnrName}) => {
    // data: { step, msgProvoke, msgWin, msgLose, msgTie, actionsSent, actionsResp:[] }

    const OnBtnFight = (event) => {
        event.preventDefault();

        SendMessage({ 
            type: Consts.msgTypes.CE_FIGHT,
            data: { step: Consts.fightSteps.ACCEPT }              
        }, false);

        setTimeout(() => {
            UpdateEventData({ step: Consts.fightSteps.ACT });
        }, Consts.CE_MSG_DELAY);
    }

    const OnBtnFlee = (event) => {
        event.preventDefault();

        SendMessage({ 
            type: Consts.msgTypes.CE_FIGHT,
            data: { step: Consts.fightSteps.CANCEL }              
        }, false);
        ClearEvent();
    }

    const AssessRoundWinner = (actionOfSender, actionOfReponder) => {
        if(actionOfSender === Consts.fightRoundActions.PUNCH) {
            if(actionOfReponder === Consts.fightRoundActions.PUNCH)
                return Consts.fightWinner.TIE
            else if(actionOfReponder === Consts.fightRoundActions.TACKLE)
                return Consts.fightWinner.SENDER
            else if(actionOfReponder === Consts.fightRoundActions.KICK)
                return Consts.fightWinner.RESPONDER
        }
        else if(actionOfSender === Consts.fightRoundActions.TACKLE) {
            if(actionOfReponder === Consts.fightRoundActions.PUNCH)
                return Consts.fightWinner.RESPONDER
            else if(actionOfReponder === Consts.fightRoundActions.TACKLE)
                return Consts.fightWinner.TIE
            else if(actionOfReponder === Consts.fightRoundActions.KICK)
                return Consts.fightWinner.SENDER
        }
        else if(actionOfSender === Consts.fightRoundActions.KICK) {
            if(actionOfReponder === Consts.fightRoundActions.PUNCH)
                return Consts.fightWinner.SENDER
            else if(actionOfReponder === Consts.fightRoundActions.TACKLE)
                return Consts.fightWinner.RESPONDER
            else if(actionOfReponder === Consts.fightRoundActions.KICK)
                return Consts.fightWinner.TIE
        }
    }

    const OnAct = (event, fightAction) => {
        event.preventDefault();

        data.actionsResp.push(fightAction);

        const actionSent = data.actionsSent[data.actionsResp.length - 1];

        // This regular step will parse the given win/loss/tie and declare a winner, displaying the correct message for each battler.
        SendMessage({ 
            type: Consts.msgTypes.CE_FIGHT,
            data: {
                step: Consts.fightSteps.ACT,
                roundWinner: AssessRoundWinner(actionSent, fightAction),
                actionSent: actionSent,
                actionResp: fightAction
            }              
        }, false);

        // Last action taken, fight over
        if(data.actionsResp.length >= data.actionsSent.length) {
            // The END step will parse the # of wins/losses/ties and declare a winner, displaying the correct message for each battler.
            setTimeout(() => {

                // Read all results and declare and make some declaration of winner.
                var senderWins = 0;
                var responderWins = 0;

                for(let i = 0; i < data.actionsSent.length; i++) {
                    const roundWinner = AssessRoundWinner(data.actionsSent[i], data.actionsResp[i]);
                    if(roundWinner === Consts.fightWinner.SENDER)
                        senderWins++;
                    else if(roundWinner === Consts.fightWinner.RESPONDER)
                        responderWins++;
                }

                // Messages were setup by Sender
                var fightWinner = Consts.fightWinner.TIE;
                var msgEnd = data.msgTie;
                if(senderWins > responderWins) {
                    fightWinner = Consts.fightWinner.SENDER;
                    msgEnd = data.msgWin;
                }
                else if(senderWins < responderWins) {
                    fightWinner = Consts.fightWinner.RESPONDER;
                    msgEnd = data.msgLose;
                }

                ClearEvent();
                SendMessage({ 
                    type: Consts.msgTypes.CE_FIGHT,
                    data: { 
                        step: Consts.fightSteps.END,
                        fightWinner,
                        msgEnd
                    }
                }, false);
            }, Consts.CE_MSG_DELAY);
        }
        // Fight continuing
        else {
            // This is simply acting as recussion, bringing us here again.
            setTimeout(() => {
                UpdateEventData({ step: Consts.fightSteps.ACT });
            }, Consts.CE_MSG_DELAY);
        }            
    }

    if(data.step === Consts.fightSteps.INIT) {
        return (
           fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">Awaiting response...</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">Your response?</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={OnBtnFight}>Fight</button>
                            <button className="btn bg-danger text-white" onClick={OnBtnFlee}>Flee</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.fightSteps.ACT) {
        return (
           fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">Select a move:</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={event => OnAct(event, Consts.fightRoundActions.PUNCH)}>
                                <img src={imgPunch} alt="punch" className="m-1" />
                            </button>
                            <button className="btn bg-warning mr-3" onClick={event => OnAct(event, Consts.fightRoundActions.TACKLE)}>
                                <img src={imgTackle} alt="tackle" className="m-1" />
                            </button>
                            <button className="btn bg-warning" onClick={event => OnAct(event, Consts.fightRoundActions.KICK)}>
                                <img src={imgKick} alt="kick" className="m-1" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">{chatPtnrName} is selecting a move...</div>
                    </div>
                </div>
            )
        );
    }
    else return "";
};


export default IBFightEngage;