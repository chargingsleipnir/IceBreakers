import React from 'react';
import ReactEmoji from 'react-emoji';
import * as Consts from '../../../../../Consts';

const IBBlankOutcome = ({ message: { fromSelf, data}, chatPtnrName }) => {


    if(data.step === Consts.blankSteps.INIT) {

        const msg = fromSelf ? `You invited ${chatPtnrName} to read your mind!` : `${chatPtnrName} invited you to test your ESP!`;
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">{msg}</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.blankSteps.ACCEPT) {

        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">Invitation accepted!</div>
                </div>
            </div>
        );     
    }
    else if(data.step === Consts.blankSteps.REJECT) {

        const msg = fromSelf ? `You're antenna's not working right now.` : `${chatPtnrName} isn't feeling too perceptive right now.`;
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-center fromAdmin">
                    <div className="messageText text-white">{ReactEmoji.emojify(msg)}</div>
                </div>
            </div>
        );
    }

    // data. preBlank, asBlank, postBlank, blankGuess
    else if(data.step === Consts.blankSteps.FILL) {

        const msgBlankFilled = 
        <div className={`messageText text-center ${fromSelf ? "bg-white" : "bgLightGreen"} pt-1 pb-1 pl-2 pr-2 mt-1`}>
            <span>{ReactEmoji.emojify(data.preBlank)}</span>
            <u className="text-danger">{ReactEmoji.emojify(data.asBlank)}</u>
            <span>{ReactEmoji.emojify(data.postBlank)}</span>
        </div>

        const msgBlankGuessed = 
        <div className={`messageText text-center ${fromSelf ? "bgLightGreen" : "bg-white"} pt-1 pb-1 pl-2 pr-2 mt-1 mb-2`}>
            <span>{ReactEmoji.emojify(data.preBlank)}</span>
            <u className="text-danger">{ReactEmoji.emojify(data.blankGuess)}</u>
            <span>{ReactEmoji.emojify(data.postBlank)}</span>
        </div>

        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox fullW bgLightBlue fromAdmin"> {/*// TODO: Add "fullW" ? */}
                    <div className="small text-light">{data.guessMatch ? "Match!" : "No match"}</div>
                    {msgBlankFilled}
                    {msgBlankGuessed}
                </div>
            </div>
        );
    }

    // data. statementCount, matchcount
    else if(data.step === Consts.blankSteps.END) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="messageBox bgLightBlue text-light text-center fromAdmin small">
                    Matches: {data.matchcount} of {data.statementCount}
                </div>
            </div>
        );
    }
    else return "";
};

export default IBBlankOutcome;