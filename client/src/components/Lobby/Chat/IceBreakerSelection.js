import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import * as Consts from '../../../Consts';
import PageTitleBar from './PageTitleBar';
import IBFightSetup from './IceBreakers/Fight/Setup';
import IBTrapSetup from './IceBreakers/Trap/Setup';
import IBBlankSetup from './IceBreakers/Blank/Setup';

class IceBreakerSelection extends Component {

    state = {
        iceBreaker: Consts.iceBreakers.NONE
    }

    // props: ReturnToChat, user_Chat_Active, LaunchChatEvent
    constructor(props) {
        super(props);

        this.ReturnToSelection = this.ReturnToSelection.bind(this);
    }

    ReturnToSelection() {
        this.setState({ iceBreaker: Consts.iceBreakers.NONE });
    }

    render() {
        if(this.state.iceBreaker === Consts.iceBreakers.NONE) {

            return (
                <div className="h-100 w-100 d-flex flex-column">
                    <PageTitleBar BackFunc={this.props.ReturnToChat} title="Ice Breakers" subtitle={this.props.user_Chat_Active ? "" : " [user offline]"} />
                    <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                        <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="d-flex flex-column pad10">
                            {/* FIGHT */}
                            <button 
                                type="button"
                                className="btn btn-lg bgLightBlue text-white m-0Auto minW50pct maxW1000 innerScrollItem"
                                onClick={() => this.setState({ iceBreaker: Consts.iceBreakers.FIGHT })}
                                disabled={!this.props.user_Chat_Active}
                            >
                                <i className="fas fa-fist-raised fa-lg transFlipYRot90"></i>
                                <span className="ml-4">FIGHT</span>
                            </button>
                            {/* TRAP */}
                            <button
                                type="button"
                                className="btn btn-lg bgLightBlue text-white m-0Auto mt-2 minW50pct maxW1000 innerScrollItem"
                                onClick={() => this.setState({ iceBreaker: Consts.iceBreakers.TRAP })}
                                disabled={!this.props.user_Chat_Active}
                            >
                                {/*<i className="fas fa-dungeon fa-lg"></i>*/}
                                <i className="fas fa-gift fa-lg"></i>
                                <span className="ml-4">GIFT</span>
                            </button>
                            {/* BLANK */}
                            <button
                                type="button"
                                className="btn btn-lg bgLightBlue text-white m-0Auto mt-2 minW50pct maxW1000 innerScrollItem"
                                onClick={() => this.setState({ iceBreaker: Consts.iceBreakers.BLANK })}
                                disabled={!this.props.user_Chat_Active}
                            >
                                <i className="fas fa-eye-slash fa-lg"></i>
                                <span className="ml-4">BLANKS</span>
                            </button>
                        </ScrollToBottom>
                    </div>
                </div>
            );
        }
        else if(this.state.iceBreaker === Consts.iceBreakers.FIGHT) {
            return (<IBFightSetup 
                ReturnToSelection={this.ReturnToSelection} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchChatEvent={this.props.LaunchChatEvent}  
            />);
        }
        else if(this.state.iceBreaker === Consts.iceBreakers.TRAP) {
            return (<IBTrapSetup 
                ReturnToSelection={this.ReturnToSelection} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchChatEvent={this.props.LaunchChatEvent}  
            /> );
        }
        else if(this.state.iceBreaker === Consts.iceBreakers.BLANK) {
            return (<IBBlankSetup 
                ReturnToSelection={this.ReturnToSelection} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchChatEvent={this.props.LaunchChatEvent}  
            /> );
        }
    }
};

export default IceBreakerSelection;