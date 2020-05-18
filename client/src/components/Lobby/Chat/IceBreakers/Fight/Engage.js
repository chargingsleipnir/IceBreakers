import React from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../../../Consts';

// import imgPunch from '../../../../../images/Punch_02_32x32.png';
// import imgTackle from '../../../../../images/Tackle_01_32x32.png';
// import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightEngage = ({ eventData: { fromSelf, data }, SendMessage, ClearEvent}) => {
    // data: { step, msgProvoke, msgWin, msgLose, moves }

    if(data.step === Consts.fightSteps.INIT) {

        const OnBtnFight = (event) => {
            event.preventDefault();

        }

        const OnBtnFlee = (event) => {
            event.preventDefault();

            SendMessage({ 
                type: Consts.msgTypes.CE_FIGHT,
                data: { step: Consts.fightSteps.CANCEL }              
            }, false);
            ClearEvent();
        }

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
                        <button className="btn bg-warning mr-3" onClick={null}>Fight</button>
                        <button className="btn bg-danger text-white" onClick={OnBtnFlee}>Flee</button>
                    </div>
                </div>
            </div>
            )
        );
    }
    else return "";
};

export default IBFightEngage;