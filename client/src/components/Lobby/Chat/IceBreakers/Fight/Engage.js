import React, { useState } from 'react';
import ReactEmoji from 'react-emoji';
import Consts from '../../../../../Consts';

import imgPunch from '../../../../../images/Punch_02_32x32.png';
import imgTackle from '../../../../../images/Tackle_01_32x32.png';
import imgKick from '../../../../../images/Kick_02_32x32.png';

const IBFightEngage = ({ eventData: { fromSelf, data }, SendMessage, UpdateEventData, ClearEvent, chatPtnrName}) => {
    // data: { step, msgProvoke, msgWin, msgLose, msgTie, actions }

    const [rounds, SetRounds] = useState([]);

    const AssessAction = (fightActionSubj, fightActionObj) => {
        if(fightActionSubj === Consts.fightActions.PUNCH) {
            if(fightActionObj === Consts.fightActions.PUNCH)
                return Consts.fightResults.TIE
            else if(fightActionObj === Consts.fightActions.TACKLE)
                return Consts.fightResults.WIN
            else if(fightActionObj === Consts.fightActions.KICK)
                return Consts.fightResults.LOSE
        }
        else if(fightActionSubj === Consts.fightActions.TACKLE) {
            if(fightActionObj === Consts.fightActions.PUNCH)
                return Consts.fightResults.LOSE
            else if(fightActionObj === Consts.fightActions.TACKLE)
                return Consts.fightResults.TIE
            else if(fightActionObj === Consts.fightActions.KICK)
                return Consts.fightResults.WIN
        }
        else if(fightActionSubj === Consts.fightActions.KICK) {
            if(fightActionObj === Consts.fightActions.PUNCH)
                return Consts.fightResults.WIN
            else if(fightActionObj === Consts.fightActions.TACKLE)
                return Consts.fightResults.LOSE
            else if(fightActionObj === Consts.fightActions.KICK)
                return Consts.fightResults.TIE
        }
    }

    if(data.step === Consts.fightSteps.INIT) {

        const OnBtnFight = (event) => {
            event.preventDefault();

            SendMessage({ 
                type: Consts.msgTypes.CE_FIGHT,
                data: { step: Consts.fightSteps.ACCEPT }              
            }, false);

            setTimeout(() => {
                UpdateEventData({ step: Consts.fightSteps.ACT });
            }, Consts.CE_MSG_DELAY);
        }

        const OnBtnFlee = (event) => {
            event.preventDefault();

            SendMessage({ 
                type: Consts.msgTypes.CE_FIGHT,
                data: { step: Consts.fightSteps.CANCEL }              
            }, false);
            ClearEvent();
        }

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
                        <div className="messageText text-center text-white">Your response?</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={OnBtnFight}>Fight</button>
                            <button className="btn bg-danger text-white" onClick={OnBtnFlee}>Flee</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
    else if(data.step === Consts.fightSteps.ACT) {

        const OnAct = (event, fightAction) => {
            event.preventDefault();

            const result = AssessAction(fightAction, data.actions[rounds.length]);
            const round = { fightActionSubj: fightAction, fightActionObj: data.actions[rounds.length], result };
            SetRounds([...rounds, round]);

            SendMessage({ 
                type: Consts.msgTypes.CE_FIGHT,
                data: {
                    step: Consts.fightSteps.ACT,
                    round
                }              
            }, false);

            // Last action taken, fight over
            if(rounds.length >= data.actions.length) {
                // The END step will parse the # of wins/losses/ties and declare a winner, displaying the correct message.
                setTimeout(() => {
                    ClearEvent();
                    SendMessage({ 
                        type: Consts.msgTypes.CE_FIGHT,
                        data: { 
                            step: Consts.fightSteps.END,
                            rounds
                        }
                    }, false);

                    SetRounds([]);
                }, Consts.CE_MSG_DELAY);
            }
            // Fight continuing
            else {
                // This is simply acting as recussion, bringing us here again.
                setTimeout(() => {
                    UpdateEventData({ step: Consts.fightSteps.ACT });
                }, Consts.CE_MSG_DELAY);
            }            
        }

        return (
           fromSelf ? (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">Select a move:</div>
                        <div className="d-flex justify-content-around mt-1 p-2">
                            <button className="btn bg-warning mr-3" onClick={event => OnAct(event, Consts.fightActions.PUNCH)}>
                                <img src={imgPunch} alt="punch" className="m-1" />
                            </button>
                            <button className="btn bg-warning mr-3" onClick={event => OnAct(event, Consts.fightActions.TACKLE)}>
                                <img src={imgTackle} alt="tackle" className="m-1" />
                            </button>
                            <button className="btn bg-warning" onClick={event => OnAct(event, Consts.fightActions.KICK)}>
                                <img src={imgKick} alt="kick" className="m-1" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center mt-2">
                    <div className="messageBox bgLightBlue fromAdmin">
                        <div className="messageText text-center text-white">{chatPtnrName} is selecting a move...</div>
                    </div>
                </div>
            )
        );
    }
    else return "";
};


export default IBFightEngage;


// TODO: Find some other way to store persistent data... maybe along side the "actions" array of the user event data
//* Even as a class with constructor (below), the data does not persist, as a new instance of the class is created each time the component is called
// The constructor cal repeats each time... :/

//* Since this.props.user_Chat.chatEventDisp actually stops the component from being used, not just displayed, is it possible that using it to
// simply mask this html from within the component could allow the instance to persist??????????


// import React, { Component } from 'react';
// import ReactEmoji from 'react-emoji';
// import Consts from '../../../../../Consts';

// import imgPunch from '../../../../../images/Punch_02_32x32.png';
// import imgTackle from '../../../../../images/Tackle_01_32x32.png';
// import imgKick from '../../../../../images/Kick_02_32x32.png';

// class IBFightEngage extends Component {

//     //{ eventData: { fromSelf, data }, SendMessage, UpdateEventData, ClearEvent, chatPtnrName}
//     // data: { step, msgProvoke, msgWin, msgLose, msgTie, actions }
//     constructor(props) {
//         super(props);

//         console.log("IBFightEngage constructor |||||||||||||||||||||||||||||");

//         this.data = this.props.eventData.data;
//         this.rounds = [];

//         this.AssessAction = this.AssessAction.bind(this);
//         this.OnBtnFight = this.OnBtnFight.bind(this);
//         this.OnBtnFlee = this.OnBtnFlee.bind(this);
//         this.OnAct = this.OnAct.bind(this);
//     }

//     AssessAction (fightActionSubj, fightActionObj) {
//         if(fightActionSubj === Consts.fightActions.PUNCH) {
//             if(fightActionObj === Consts.fightActions.PUNCH)
//                 return Consts.fightResults.TIE
//             else if(fightActionObj === Consts.fightActions.TACKLE)
//                 return Consts.fightResults.WIN
//             else if(fightActionObj === Consts.fightActions.KICK)
//                 return Consts.fightResults.LOSE
//         }
//         else if(fightActionSubj === Consts.fightActions.TACKLE) {
//             if(fightActionObj === Consts.fightActions.PUNCH)
//                 return Consts.fightResults.LOSE
//             else if(fightActionObj === Consts.fightActions.TACKLE)
//                 return Consts.fightResults.TIE
//             else if(fightActionObj === Consts.fightActions.KICK)
//                 return Consts.fightResults.WIN
//         }
//         else if(fightActionSubj === Consts.fightActions.KICK) {
//             if(fightActionObj === Consts.fightActions.PUNCH)
//                 return Consts.fightResults.WIN
//             else if(fightActionObj === Consts.fightActions.TACKLE)
//                 return Consts.fightResults.LOSE
//             else if(fightActionObj === Consts.fightActions.KICK)
//                 return Consts.fightResults.TIE
//         }
//     }

//     OnBtnFight (event) {
//         event.preventDefault();

//         this.props.SendMessage({ 
//             type: Consts.msgTypes.CE_FIGHT,
//             data: { step: Consts.fightSteps.ACCEPT }              
//         }, false);

//         setTimeout(() => {
//             this.props.UpdateEventData({ step: Consts.fightSteps.ACT });
//         }, Consts.CE_MSG_DELAY);
//     }

//     OnBtnFlee (event) {
//         event.preventDefault();

//         this.props.SendMessage({ 
//             type: Consts.msgTypes.CE_FIGHT,
//             data: { step: Consts.fightSteps.CANCEL }              
//         }, false);
//         this.props.ClearEvent();
//     }

//     OnAct (event, fightAction) {
//         event.preventDefault();

//         const result = this.AssessAction(fightAction, this.data.actions[this.rounds.length]);
//         const round = { fightActionSubj: fightAction, fightActionObj: this.data.actions[this.rounds.length], result };
//         this.rounds.push(round);

//         this.props.SendMessage({ 
//             type: Consts.msgTypes.CE_FIGHT,
//             data: {
//                 step: Consts.fightSteps.ACT,
//                 round
//             }              
//         }, false);

//         console.log(this.rounds);

//         // Last action taken, fight over
//         if(this.rounds.length >= this.data.actions.length) {
//             // The END step will parse the # of wins/losses/ties and declare a winner, displaying the correct message.
//             setTimeout(() => {
//                 this.props.ClearEvent();
//                 this.props.SendMessage({ 
//                     type: Consts.msgTypes.CE_FIGHT,
//                     data: { 
//                         step: Consts.fightSteps.END,
//                         rounds: this.rounds
//                     }
//                 }, false);

//                 this.rounds = [];
//             }, Consts.CE_MSG_DELAY);
//         }
//         // Fight continuing
//         else {
//             // This is simply acting as recussion, bringing us here again.
//             setTimeout(() => {
//                 this.props.UpdateEventData({ step: Consts.fightSteps.ACT });
//             }, Consts.CE_MSG_DELAY);
//         }            
//     }

//     render() {
//         if(this.data.step === Consts.fightSteps.INIT) {
//             if(this.props.eventData.fromSelf) {
//                 return (
//                     <div className="d-flex justify-content-center mt-2">
//                         <div className="messageBox bgLightBlue fromAdmin">
//                             <div className="messageText text-center text-white">Awaiting response...</div>
//                         </div>
//                     </div>
//                 );
//             }
//             else {
//                 return (
//                     <div className="d-flex justify-content-center mt-2">
//                         <div className="messageBox bgLightBlue fromAdmin">
//                             <div className="messageText text-center text-white">Your response?</div>
//                             <div className="d-flex justify-content-around mt-1 p-2">
//                                 <button className="btn bg-warning mr-3" onClick={this.OnBtnFight}>Fight</button>
//                                 <button className="btn bg-danger text-white" onClick={this.OnBtnFlee}>Flee</button>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             }
//         }
//         else if(this.data.step === Consts.fightSteps.ACT) {
//             if(this.props.eventData.fromSelf) {
//                 return (
//                     <div className="d-flex justify-content-center mt-2">
//                         <div className="messageBox bgLightBlue fromAdmin">
//                             <div className="messageText text-center text-white">Select a move:</div>
//                             <div className="d-flex justify-content-around mt-1 p-2">
//                                 <button className="btn bg-warning mr-3" onClick={event => this.OnAct(event, Consts.fightActions.PUNCH)}>
//                                     <img src={imgPunch} alt="punch" className="m-1" />
//                                 </button>
//                                 <button className="btn bg-warning mr-3" onClick={event => this.OnAct(event, Consts.fightActions.TACKLE)}>
//                                     <img src={imgTackle} alt="tackle" className="m-1" />
//                                 </button>
//                                 <button className="btn bg-warning" onClick={event => this.OnAct(event, Consts.fightActions.KICK)}>
//                                     <img src={imgKick} alt="kick" className="m-1" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             }
//             else {
//                 return (
//                     <div className="d-flex justify-content-center mt-2">
//                         <div className="messageBox bgLightBlue fromAdmin">
//                             <div className="messageText text-center text-white">{this.props.chatPtnrName} is selecting a move...</div>
//                         </div>
//                     </div>
//                 );
//             }
//         }
//         else return "";
//     }
// };

// export default IBFightEngage;