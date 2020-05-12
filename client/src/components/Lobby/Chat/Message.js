import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { msgText, fromSender } }) => {

    console.log(`Message created. From sender: ${fromSender}, msg text: "${msgText}"`);

    return (
        fromSender ? (
            <div className="d-flex justify-content-end mt-3">
                <div className="messageBox bgLightBlue fromSelf">
                    <div className="messageText text-white">{ReactEmoji.emojify(msgText)}</div>
                </div>
            </div>
        ) : (
            <div className="d-flex justify-content-start mt-3">
                <div className="messageBox bg-white fromOther">
                    <div className="messageText">{ReactEmoji.emojify(msgText)}</div>
                </div>
            </div>
        )
    )
}

export default Message;