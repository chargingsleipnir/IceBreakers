import React from 'react';
import ReactEmoji from 'react-emoji';
import * as Consts from '../../../Consts';
import IBFightOutcome from './IceBreakers/Fight/Outcome';
import IBTrapOutcome from './IceBreakers/Trap/Outcome';

const Message = ({ message, chatPtnrName }) => {

    if(message.type === Consts.msgTypes.TEXT) {
        //console.log(`Message created. From self: ${fromSelf}, msg text: "${data}"`);
        return (
            message.fromSelf ? (
                <div className="d-flex justify-content-end mt-2">
                    <div className="messageBox bgLightGreen fromSelf">
                        <div className="messageText">{ReactEmoji.emojify(message.data)}</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-start mt-2">
                    <div className="messageBox bg-white fromOther">
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
        //console.log(`Message created. From self: ${fromSelf}, provocation text: "${data.msgProvoke}"`);
        return( <IBTrapOutcome message={message} chatPtnrName={chatPtnrName} /> );
    }
}

export default Message;