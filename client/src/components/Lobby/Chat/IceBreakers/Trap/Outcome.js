import React from 'react';
import ReactEmoji from 'react-emoji';
import CanvasDraw from 'react-canvas-draw';
import * as Consts from '../../../../../Consts';

const IBTrapOutcome = ({ message: { fromSelf, data}, chatPtnrName }) => {

    // "Self" - the person who sent these messages, is the potentially trapped.
    const GetTrapResultMessage = (trapSuccess) => {
        if(trapSuccess)
            return fromSelf ? `You got caught in ${chatPtnrName}'s trap!` : `You caught ${chatPtnrName} in your trap!`;
        else
            return fromSelf ? `You broke free from ${chatPtnrName}'s trap!` : `${chatPtnrName} broke out of your trap!`;
    }

    const GetGiftCanvas = (canGift) => {
        let giftCanvas = "";
        if(canGift) {
            giftCanvas = (
                <div className="d-flex justify-content-center mt-2">
                    <div className="position-relative drawCanvasCont">
                        <CanvasDraw
                            disabled
                            hideGrid
                            canvasWidth="250px" 
                            canvasHeight="250px" 
                            saveData={data.giftCanvasSaveData}
                            hideInterface="true"
                        />
                    </div>
                </div>
            );
        }

        return giftCanvas;
    }

    if(data.step === Consts.trapSteps.INIT) {

        const msg = fromSelf ? `You sent ${chatPtnrName} ${ReactEmoji.emojify(data.giftText)}.` : `${chatPtnrName} sent you ${ReactEmoji.emojify(data.giftText)}.`;
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="outerBox fontSize90 text-center">
                    <div className="messageText text-white">{msg}</div>
                </div>
            </div>
        );
    }
    else if(data.step === Consts.trapSteps.ACCEPT) {
        return (
            <div className="mb-3">
                <div className="d-flex justify-content-center mt-2">
                    <div className="outerBox fontSize90 text-center">
                        <div className="messageText text-white">Gift accepted.</div>
                    </div>
                    
                </div>
                {GetGiftCanvas(!data.launchTrap)}
            </div>
        );
    }
    else if(data.step === Consts.trapSteps.REJECT) {

        const msg = fromSelf ? `You turned it down.` : `It was turned away.`;
        return (
            <div className="d-flex justify-content-center mt-2 mb-3">
                <div className="outerBox fontSize90 text-center">
                    <div className="messageText text-white">{msg}</div>
                </div>
            </div>
        );
    }
    /*
    trapSuccess: btnPresses >= Consts.TRAP_STRUGGLE_COUNT,
    msgEnd
    */

    // TODO: The sender should be left with the option to send the image at the end, regardless of whether or not the trap succeeded, just to ensure that the time spent doesn't have to go to waste.
    else if(data.step === Consts.trapSteps.END) {

        let msgOriginRef = ``;
        if(fromSelf) {
            msgOriginRef = `fromAdminOfOther`;
        }
        else {
            msgOriginRef = `fromAdminOfSelf`;
        }

        return (
            <div className="mb-3">
                <div className="d-flex justify-content-center mt-2">
                    <div className="outerBox text-center">
                        <div className="messageText fontSize90 text-white">{GetTrapResultMessage(data.trapSuccess)}</div>
                        <div className={`messageText messageBox mt-2 ${msgOriginRef}`}>"{ReactEmoji.emojify(data.msgEnd)}"</div>
                    </div>
                </div>
                {GetGiftCanvas(!data.trapSuccess)}
            </div>
        );
    }
    else return "";
};

export default IBTrapOutcome;