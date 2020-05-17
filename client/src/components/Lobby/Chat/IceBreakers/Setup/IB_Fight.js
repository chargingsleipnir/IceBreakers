import React from 'react';
import PageTitleBar from '../../PageTitleBar';
import Consts from '../../../../../Consts';

import imgPunch from '../../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFight = ({ ReturnToSelection, user_Chat_Active, LaunchChatEvent, user_Chat_ID }) => {

    var elem_Form = React.createRef();
    var elem_ProvokeMsg = React.createRef();
    var elem_WinMsg = React.createRef();
    var elem_LoseMsg = React.createRef();

    var rounds = [];
    for(let i = 0; i < Consts.FIGHT_MAX_ROUNDS; i++) {

        const radioName = "fightSelection_" + i;
        rounds.push(
            <div key={i}>
                <div className="d-flex justify-content-around">
                    <label className="noStyleLabel" htmlFor={radioName + "_" + Consts.fightOptions.PUNCH}>
                        <input type="radio" id={radioName + "_" + Consts.fightOptions.PUNCH} name={radioName} value={Consts.fightOptions.PUNCH} defaultChecked={true} />
                        <img src={imgPunch} alt="punch" className="m-1" />
                    </label>
                    <label className="noStyleLabel ml-1 mr-1" htmlFor={radioName + "_" + Consts.fightOptions.TACKLE}>
                        <input type="radio" id={radioName + "_" + Consts.fightOptions.TACKLE} name={radioName} value={Consts.fightOptions.TACKLE} />
                        <img src={imgTackle} alt="tackle" className="m-1" />
                    </label>
                    <label className="noStyleLabel" htmlFor={radioName + "_" + Consts.fightOptions.KICK}>
                        <input type="radio" id={radioName + "_" + Consts.fightOptions.KICK} name={radioName} value={Consts.fightOptions.KICK} />
                        <img src={imgKick} alt="kick" className="m-1" />
                    </label>
                </div>
                {i < Consts.FIGHT_MAX_ROUNDS - 1 ? <hr className="bg-light mt-2 mb-2" /> : ""}
            </div>
        );
    }

    const OnSend = (event) => {
        event.preventDefault();

        var moves = [];
        for(let i = 0; i < Consts.FIGHT_MAX_ROUNDS; i++) {
            const btns = elem_Form.elements["fightSelection_" + i];
            for(let j = 0; j < btns.length; j++) {
                if(btns[j].checked) {
                    moves.push(btns[j].value);
                }
            }
        }

        // TODO: Validate inputs? LOW PRIORITY
        LaunchChatEvent({ 
            type: Consts.msgTypes.CE_FIGHT,
            data: {
                msgProvoke: elem_ProvokeMsg.current.value,
                msgWin: elem_WinMsg.current.value,
                msgLose: elem_LoseMsg.current.value,
                moves
            },
            chatPtnrID: user_Chat_ID                
        });
    };

    return (
        <div className="h-100 w-100 d-flex flex-column">
            <PageTitleBar BackFunc={ReturnToSelection} title="Fight" subtitle={user_Chat_Active ? "" : " [user offline]"} />
            <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                <fieldset disabled={!user_Chat_Active}>
                    <form ref={form => elem_Form = form} className="maxW1000 m-0Auto reimplementScroll">
                        <div className="form-group">
                            <div className="head4 text-light">Provocation</div>
                            <input type="text" className="form-control" ref={elem_ProvokeMsg} placeholder="e.g. Put 'em up!"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light mb-2">Actions</div>
                            {rounds}
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Win message</div>
                            <input type="text" className="form-control" ref={elem_WinMsg} placeholder="e.g. Don't mess with the champ!"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Lose message</div>
                            <input type="text" className="form-control" ref={elem_LoseMsg} placeholder="e.g. Pfft, barely a flesh wound..."></input>
                        </div>
                        <button type="button" className="btn bgLightBlue text-white m-0Auto innerScrollItem" onClick={OnSend}>Send</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default IBFight;