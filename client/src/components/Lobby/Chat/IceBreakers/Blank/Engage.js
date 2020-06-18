import React from 'react';
import ReactEmoji from 'react-emoji';
import * as Consts from '../../../../../Consts';

const IBBlankEngage = ({ eventData: { fromSelf, data }, SendMessage, UpdateEventData, ClearEvent, chatPtnrName}) => {
    // data: { statements: [{}] }

    var elem_fillInput = React.createRef();

    const OnBtnTry = (event) => {
        event.preventDefault();

        SendMessage({ 
            type: Consts.msgTypes.CE_BLANK,
            data: { step: Consts.blankSteps.ACCEPT }              
        }, false);

        setTimeout(() => {
            UpdateEventData({ step: Consts.blankSteps.FILL });
        }, Consts.CE_MSG_DELAY);
    }

    const OnBtnDeny = (event) => {
        event.preventDefault();

        SendMessage({ 
            type: Consts.msgTypes.CE_BLANK,
            data: { step: Consts.blankSteps.REJECT }              
        }, false);
        ClearEvent();
    }

    const OnFill = (event, blankIndex) => {
        event.preventDefault();

        data.statements[blankIndex].blankGuess = elem_fillInput.value;
        data.statements[blankIndex].guessMatch = elem_fillInput.value.toLowerCase().trim() === data.statements[blankIndex].asBlank.toLowerCase().trim();

        SendMessage({ 
            type: Consts.msgTypes.CE_BLANK,
            data: {
                step: Consts.blankSteps.FILL,
                preBlank: data.statements[blankIndex].preBlank,
                asBlank: data.statements[blankIndex].asBlank,
                postBlank: data.statements[blankIndex].postBlank,
                blankGuess: data.statements[blankIndex].blankGuess,
                guessMatch: data.statements[blankIndex].guessMatch
            }
        }, false);

        // TODO: Prompt for next blank fill-in, or end event if there are no more.

        if(data.statements[data.statements.length - 1].blankGuess === "") {
            // This is simply acting as recussion, bringing us here again.
            setTimeout(() => {
                UpdateEventData({ 
                    step: Consts.blankSteps.FILL,
                    statements: data.statements
                });
            }, Consts.CE_MSG_DELAY);
        }
        else {
            // The END step will parse the # of wins/losses/ties and declare a winner, displaying the correct message for each battler.
            setTimeout(() => {

                let matchcount = 0;
                for(let i = 0; i < data.statements.length; i++) {
                    if(data.statements[i].guessMatch)
                        matchcount++;
                }

                ClearEvent();
                SendMessage({ 
                    type: Consts.msgTypes.CE_BLANK,
                    data: { 
                        step: Consts.blankSteps.END,
                        statementCount: data.statements.length,
                        matchcount
                    }
                }, false);
            }, Consts.CE_MSG_DELAY);
        }
    }

    if(data.step === Consts.blankSteps.INIT) {
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
                        <div className="messageText text-center text-white">Give it a try?</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={OnBtnTry}>Try</button>
                            <button className="btn bg-danger text-white" onClick={OnBtnDeny}>Deny</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.blankSteps.FILL) {

        // TODO: Utilize revealAllAtOnce option

        var blankIndex = -1;
        for(let i = 0; i < data.statements.length; i++) {
            if(data.statements[i].blankGuess === "") {
                blankIndex = i;
                break;
            }
        }

        if(fromSelf) {
            return (
                <div>
                    <div className="d-flex justify-content-center mt-2">
                        <div className="messageBox bgLightBlue fromAdmin">
                            <div className="messageText text-center text-white">Fill in the blank:</div>
                            <div className="messageText text-center bg-white p-1 mt-2 mb-2">
                                <span>{ReactEmoji.emojify(data.statements[blankIndex].preBlank)}</span>
                                <input type="text" ref={input => elem_fillInput = input} className="bg-transparent text-danger inlineInput" maxLength={data.statements[blankIndex].asBlank.length} size={data.statements[blankIndex].asBlank.length} />
                                <span>{ReactEmoji.emojify(data.statements[blankIndex].postBlank)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around mt-1 p-2">
                        <button className="btn bg-warning font-weight-bold" onClick={event => OnFill(event, blankIndex)}>Submit</button>
                    </div>
                </div>
            );        
        }
        else {
            return (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">{chatPtnrName} is filling in the blank of:</div>
                        <div className="messageText text-center bgLightGreen p-1 mt-2 mb-2">
                            <span>{ReactEmoji.emojify(data.statements[blankIndex].preBlank)}</span>
                            <u className="text-danger">{ReactEmoji.emojify(data.statements[blankIndex].asBlank)}</u>
                            <span>{ReactEmoji.emojify(data.statements[blankIndex].postBlank)}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }
    else return "";
};


export default IBBlankEngage;