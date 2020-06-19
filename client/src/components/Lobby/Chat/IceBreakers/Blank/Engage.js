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

        // TODO
        if(data.revealAllAtOnce) {
            var inputElems = document.getElementsByClassName("blankInputElem");

            var matchCount = 0;
            for(let i = 0; i < data.statements.length; i++) {
                data.statements[i].blankGuess = inputElems[i].value;
                data.statements[i].guessMatch = inputElems[i].value.toLowerCase().trim() === data.statements[i].asBlank.toLowerCase().trim();

                if(data.statements[i].guessMatch) {
                    matchCount++;
                }
            }

            SendMessage({ 
                type: Consts.msgTypes.CE_BLANK,
                data: {
                    step: Consts.blankSteps.FILL,
                    statements: data.statements,
                    revealAllAtOnce: data.revealAllAtOnce
                }
            }, false);

            setTimeout(() => {
                ClearEvent();
                SendMessage({ 
                    type: Consts.msgTypes.CE_BLANK,
                    data: { 
                        step: Consts.blankSteps.END,
                        statementCount: data.statements.length,
                        matchCount
                    }
                }, false);
            }, Consts.CE_MSG_DELAY);
        }
        else {
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

                    let matchCount = 0;
                    for(let i = 0; i < data.statements.length; i++) {
                        if(data.statements[i].guessMatch)
                            matchCount++;
                    }

                    ClearEvent();
                    SendMessage({ 
                        type: Consts.msgTypes.CE_BLANK,
                        data: { 
                            step: Consts.blankSteps.END,
                            statementCount: data.statements.length,
                            matchCount
                        }
                    }, false);
                }, Consts.CE_MSG_DELAY);
            }
        }
    }

    if(data.step === Consts.blankSteps.INIT) {
        return (
           fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="outerBox">
                        <div className="messageText text-center text-white">Awaiting response...</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="outerBox">
                        <div className="messageText text-center text-white">Give it a try?</div>
                        <div className="d-flex justify-content-around bgLightBlue mt-2 p-2">
                            <button className="btn bg-warning mr-3" onClick={OnBtnTry}>Try</button>
                            <button className="btn bg-danger text-white" onClick={OnBtnDeny}>Deny</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.blankSteps.FILL) {

        var jsxArr = [];
        var blankIndex = -1;

        // In this case, loop through all statements and add them together into a single paragraph, meaning the inputs also need to all be managed at once.
        if(data.revealAllAtOnce) {

            for(let i = 0; i < data.statements.length; i++) {
                jsxArr.push( 
                    <span key={i}>
                        <span>{ReactEmoji.emojify(data.statements[i].preBlank)}</span>
                        {
                            fromSelf ? 
                            <input type="text" className="bg-transparent text-danger inlineInput blankInputElem" size={data.statements[i].asBlank.length} /> : 
                            <u className="text-danger">{ReactEmoji.emojify(data.statements[i].asBlank)}</u>
                        }
                        <span>{ReactEmoji.emojify(data.statements[i].postBlank)}</span>
                        &nbsp;
                    </span>
                )
            }
        }
        // Otherwise, find the next statement that has not yet been guessed at, and present it alone.
        else {
            for(let i = 0; i < data.statements.length; i++) {
                if(data.statements[i].blankGuess === "") {
                    blankIndex = i;
                    break;
                }
            }

            jsxArr.push( 
                <span key={blankIndex}>
                    <span>{ReactEmoji.emojify(data.statements[blankIndex].preBlank)}</span>
                    {
                        fromSelf ? 
                        <input type="text" ref={input => elem_fillInput = input} className="bg-transparent text-danger inlineInput" size={data.statements[blankIndex].asBlank.length} /> : 
                        <u className="text-danger">{ReactEmoji.emojify(data.statements[blankIndex].asBlank)}</u>
                    }
                    <span>{ReactEmoji.emojify(data.statements[blankIndex].postBlank)}</span>
                </span>
            )
        }

        if(fromSelf) {
            return (
                <div>
                    <div className="d-flex justify-content-center mt-2">
                        <div className="outerBox">
                            <div className="messageText text-center text-white">Fill in the blank:</div>
                            <div className="messageText text-center messageBox fromAdminOfOther mt-2 mb-2">
                                { jsxArr }
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
                    <div className="outerBox">
                        <div className="messageText text-center text-white">{chatPtnrName} is filling in the blank of:</div>
                        <div className="messageText text-center messageBox fromAdminOfSelf mt-2 mb-2">
                            { jsxArr }
                        </div>
                    </div>
                </div>
            );
        }
    }
    else return "";
};


export default IBBlankEngage;