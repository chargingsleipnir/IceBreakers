import React from 'react';
import PageTitleBar from '../PageTitleBar';
import { FIGHT_MAX_ROUNDS, fightOptions } from '../../../../Consts';

import imgPunch from '../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../images/Kick_02_32x32.png';

const IBFight = ({ ReturnToSelection, user_Chat_Active }) => {

    var rounds = [];
    for(let i = 0; i < FIGHT_MAX_ROUNDS; i++) {

        const radioName = "fightSelection_" + i;
        rounds.push(
            <div key={i}>
                <div className="d-flex justify-content-around">
                    <label className="noStyleLabel" htmlFor={radioName + "_" + fightOptions.PUNCH}>
                        <input type="radio" id={radioName + "_" + fightOptions.PUNCH} name={radioName} value={fightOptions.PUNCH} defaultChecked={true} />
                        <img src={imgPunch} alt="punch" className="m-1" />
                    </label>
                    <label className="noStyleLabel ml-1 mr-1" htmlFor={radioName + "_" + fightOptions.TACKLE}>
                        <input type="radio" id={radioName + "_" + fightOptions.TACKLE} name={radioName} value={fightOptions.TACKLE} />
                        <img src={imgTackle} alt="tackle" className="m-1" />
                    </label>
                    <label className="noStyleLabel" htmlFor={radioName + "_" + fightOptions.KICK}>
                        <input type="radio" id={radioName + "_" + fightOptions.KICK} name={radioName} value={fightOptions.KICK} />
                        <img src={imgKick} alt="kick" className="m-1" />
                    </label>
                </div>
                {i < FIGHT_MAX_ROUNDS - 1 ? <hr className="bg-light mt-2 mb-2" /> : ""}
            </div>
        );
    }

    return (
        <div className="h-100 w-100 d-flex flex-column">
            <PageTitleBar BackFunc={ReturnToSelection} title="Fight" subtitle={user_Chat_Active ? "" : " [user offline]"} />
            <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                <fieldset disabled={!user_Chat_Active}>
                    <form className="maxW1000 m-0Auto reimplementScroll">
                        <div className="form-group">
                            <div className="head4 text-light">Provocation</div>
                            <input type="text" className="form-control" placeholder="e.g. Put 'em up!"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light mb-2">Actions</div>
                            {rounds}
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Win message</div>
                            <input type="text" className="form-control" placeholder="e.g. Don't mess with the champ!"></input>
                        </div>
                        <div className="form-group">
                            <div className="head4 text-light">Lose message</div>
                            <input type="text" className="form-control" placeholder="e.g. Pfft, barely a flesh wound..."></input>
                        </div>
                        <button type="button" className="btn bgLightBlue text-white m-0Auto innerScrollItem" onClick={(event) => null}>Send</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default IBFight;