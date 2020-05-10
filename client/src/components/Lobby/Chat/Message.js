import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { msgText, fromSender } }) => {

    console.log(`Message created. From sender: ${fromSender}, msg text: "${msgText}"`);

    return (
        fromSender ? (
            <div className="messageContainer justifyEnd">
                {/*<p className="sentText pr-10">{my name}</p>*/}
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(msgText)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(msgText)}</p>
                </div>
                {/*<p className="sentText pl-10">{their name}</p>*/}
            </div>
        )
    )
}

export default Message;