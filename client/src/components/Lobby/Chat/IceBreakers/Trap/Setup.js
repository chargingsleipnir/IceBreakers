import React from 'react';
import PageTitleBar from '../../PageTitleBar';
import * as Consts from '../../../../../Consts';

const IBTrapSetup = ({ ReturnToSelection, user_Chat_Active, LaunchChatEvent }) => {

    // TODO: Look-up & add small draw component, very simple, and make sure it's mobile friendly of course!
    // TODO: Perhaps make this a combo gift/trap event, and add a slider here in setup to adjust the percentage chance of the trap being sprung.
    // That way they can just drop the image if desired, otherwise gamify it. - This would keep the reciepients guessing as well.

    var elem_BaitText = React.createRef();
    var elem_SuccessMsg = React.createRef();
    var elem_FailMsg = React.createRef();

    const OnSend = (event) => {
        event.preventDefault();

        // Cache values so setTimeout can use them despite being gone from original source.
        const textBait = elem_BaitText.current.value;
        const msgSuccess = elem_SuccessMsg.current.value;
        const msgFail = elem_FailMsg.current.value;

        // TODO: Validate inputs? LOW PRIORITY
        LaunchChatEvent({ 
            type: Consts.msgTypes.CE_TRAP,
            data: {
                step: Consts.trapSteps.INIT,
                bait: textBait
            }              
        }, false);

        setTimeout(() => {
            LaunchChatEvent({ 
                type: Consts.msgTypes.CE_TRAP,
                data: {
                    step: Consts.trapSteps.INIT,
                    textBait,
                    msgSuccess,
                    msgFail
                }             
            }, true);
        }, Consts.CE_MSG_DELAY);
    };

    return (
        <div className="h-100 w-100 d-flex flex-column">
            <PageTitleBar BackFunc={ReturnToSelection} title="Trap" subtitle={user_Chat_Active ? "" : " [user offline]"} />
            <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                <fieldset disabled={!user_Chat_Active}>
                    <form className="maxW1000 m-0Auto reimplementScroll">
                        <div className="form-group">
                            <div className="head4 text-light">Bait</div>
                            <input type="text" className="form-control" ref={elem_BaitText} placeholder="e.g. 5 cents"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Success message</div>
                            <input type="text" className="form-control" ref={elem_SuccessMsg} placeholder="e.g. Was it really worth the risk?!"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Fail message</div>
                            <input type="text" className="form-control" ref={elem_FailMsg} placeholder="e.g. Don't spend it all in one place!"></input>
                        </div>
                        <button type="button" className="btn bgLightBlue text-white m-0Auto innerScrollItem" onClick={OnSend}>Send</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default IBTrapSetup;