import React from 'react';
import ReactEmoji from 'react-emoji';
import * as Consts from '../../../Consts';
import IBFightOutcome from './IceBreakers/Fight/Outcome';
import IBTrapOutcome from './IceBreakers/Trap/Outcome';
import IBBlankOutcome from './IceBreakers/Blank/Outcome';

const Message = ({ message, chatPtnrName }) => {

    if(message.type === Consts.msgTypes.TEXT) {
        //console.log(`Message created. From self: ${fromSelf}, msg text: "${data}"`);
        return (
            message.fromSelf ? (
                <div className="d-flex justify-content-end mt-2">
                    <div className="outerBox messageBox bgLightGreen fromSelf">
                        <div className="messageText">{ReactEmoji.emojify(message.data)}</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-start mt-2">
                    <div className="outerBox messageBox bg-white fromOther">
                        <div className="messageText">{ReactEmoji.emojify(message.data)}</div>
                    </div>
                </div>
            )
        )
    }

    // TODO: See "Chat.js" TODO for everything there is to consider here...
    else if(message.type === Consts.msgTypes.CE_FIGHT) {
        //console.log(`Message created. From self: ${fromSelf}, provocation text: "${data.msgProvoke}"`);
        return( <IBFightOutcome message={message} chatPtnrName={chatPtnrName} /> );
    }
    else if(message.type === Consts.msgTypes.CE_TRAP) {
        return( <IBTrapOutcome message={message} chatPtnrName={chatPtnrName} /> );
    }
    else if(message.type === Consts.msgTypes.CE_BLANK) {
        return( <IBBlankOutcome message={message} chatPtnrName={chatPtnrName} /> );
    }
}

export default Message;