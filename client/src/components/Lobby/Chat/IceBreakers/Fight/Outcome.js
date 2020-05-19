import React from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../../../Consts';

import imgPunch from '../../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightOutcome = ({ message: { fromSelf, data}, chatPtnrName }) => {

    const GetImage = (action) => {
        if(action === Consts.fightActions.PUNCH)
            return imgPunch;
        else if(action === Consts.fightActions.TACKLE)
            return imgTackle;
        else if(action === Consts.fightActions.KICK)
            return imgKick;
    }

    // fromSelf - self being the subject, or action taker.
    const GetFightResultMessage = (fightResult) => {
        if(fightResult === Consts.fightResults.LOSE)
            return fromSelf ? "Ouch!" : "Nice!";
        else if(fightResult === Consts.fightResults.TIE)
            return "Oof...";
        else if(fightResult === Consts.fightResults.WIN)
            return fromSelf ? "Nice!" : "Ouch!";
    }

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
    // data = { step, round: { fightActionSubj, fightActionObj, result } }
    else if(data.step === Consts.fightSteps.ACT) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox fullW bgLightBlue fromAdmin">
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        <div className="bg-warning mr-3">
                            <img src={GetImage(data.round[fromSelf ? "fightActionObj" : "fightActionSubj"])} alt="action" className="m-1" />
                        </div>
                        <div className="mr-3 text-white">
                            {GetFightResultMessage(data.round.result)}
                        </div>
                        <div className="bg-warning">
                            <img src={GetImage(data.round[fromSelf ? "fightActionSubj" : "fightActionObj"])} alt="action" className="m-1" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // data = { step, results: [Const.fightOutcomes: { LOSE: -1, TIE: 0, WIN: 1 }] }
    else if(data.step === Consts.fightSteps.END) {

        // TODO: Read all results and declare and make some declaration of winner.

        return (
            fromSelf ? (
                <div className="d-flex justify-content-center mt-2">

                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">

                </div>
            )
        );
    }
    else return "";
};

export default IBFightOutcome;