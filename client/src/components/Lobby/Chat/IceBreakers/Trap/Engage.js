import React from 'react';
import * as Consts from '../../../../../Consts';

const IBTrapEngage = ({ eventData: { fromSelf, data }, SendMessage, UpdateEventData, ClearEvent, chatPtnrName}) => {

    const OnBtnAccept = (event) => {
        event.preventDefault();

        SendMessage({ 
            type: Consts.msgTypes.CE_TRAP,
            data: { step: Consts.trapSteps.ACCEPT }              
        }, false);

        setTimeout(() => {
            UpdateEventData({ step: Consts.trapSteps.STRUGGLE });
        }, Consts.CE_MSG_DELAY);
    }

    const OnBtnReject = (event) => {
        event.preventDefault();

        ClearEvent();

        SendMessage({ 
            type: Consts.msgTypes.CE_TRAP,
            data: { step: Consts.trapSteps.REJECT }              
        }, false);
    }

    if(data.step === Consts.trapSteps.INIT) {
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
                        <div className="messageText text-center text-white">Do you accept?</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={OnBtnAccept}>Accept</button>
                            <button className="btn bg-danger text-white" onClick={OnBtnReject}>Reject</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.trapSteps.STRUGGLE) {
        if(fromSelf) {
            var btnPresses = 0
            const OnBtnStruggle = (event) => {
                event.preventDefault();
                btnPresses++;
            }

            // TODO: Set interval or css animation..., make button flash to indicate the need to push repeatedly.

            setTimeout(() => {
                var msgEnd = data.msgFail;
                // The trappee couldn't struggle enough, so the trap succeeded.
                if(btnPresses < Consts.TRAP_STRUGGLE_COUNT) {
                    msgEnd = data.msgSuccess;
                }

                ClearEvent();
                SendMessage({ 
                    type: Consts.msgTypes.CE_TRAP,
                    data: { 
                        step: Consts.trapSteps.END,
                        trapSuccess: btnPresses < Consts.TRAP_STRUGGLE_COUNT,
                        msgEnd
                    }
                }, false);
            }, Consts.TRAP_STRUGGLE_TIME);

            return (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">It's a trap!</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning" onClick={OnBtnStruggle}>STRUGGLE!!</button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">Trap activated! struggle ensuing...</div>
                    </div>
                </div>
             );
        }
    }
};

export default IBTrapEngage;