import React from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../Consts';

const Message = ({ message: { type, data, chatPtnrID, fromSelf } }) => {

    if(type === Consts.msgTypes.TEXT) {
        //console.log(`Message created. From self: ${fromSelf}, msg text: "${data}"`);

        return (
            fromSelf ? (
                <div className="d-flex justify-content-end mt-2">
                    <div className="messageBox bgLightBlue fromSelf">
                        <div className="messageText text-white">{ReactEmoji.emojify(data)}</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-start mt-2">
                    <div className="messageBox bg-white fromOther">
                        <div className="messageText">{ReactEmoji.emojify(data)}</div>
                    </div>
                </div>
            )
        )
    }

    // TODO: Obviously change this a lot.
    //* All move data is here, not saved to server... play it out here and just send responses to sender?
    // data: {
    //     msgProvoke: elem_ProvokeMsg.current.value,
    //     msgWin: elem_WinMsg.current.value,
    //     msgLose: elem_LoseMsg.current.value,
    //     moves
    // },

    else if(type === Consts.msgTypes.CE_FIGHT) {
        //console.log(`Message created. From self: ${fromSelf}, provocation text: "${data.msgProvoke}"`);

        return (
            fromSelf ? (
                <div className="d-flex justify-content-end mt-2">
                    <div className="messageBox bgLightBlue fromSelf">
                        <div className="messageText text-white">{ReactEmoji.emojify("Fight started by me " + data.msgWin)}</div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-start mt-2">
                    <div className="messageBox bg-white fromOther">
                        <div className="messageText">{ReactEmoji.emojify("Fight started by other person " + data.msgProvoke)}</div>
                    </div>
                </div>
            )
        )
    }
}

export default Message;