import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Consts from '../../../Consts';
import PageTitleBar from './PageTitleBar';
import IBFightSetup from './IceBreakers/Setup/IB_Fight';
import IBTrapSetup from './IceBreakers/Setup/IB_Trap';

class IceBreakerSelection extends Component {

    state = {
        iceBreaker: Consts.iceBreakers.NONE
    }

    // props: ReturnToChat, user_Chat_Active, LaunchChatEvent, user_Chat_ID
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
                                <i className="fas fa-dungeon fa-lg"></i>
                                <span className="ml-4">TRAP</span>
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
                user_Chat_ID={this.props.user_Chat_ID} 
            />);
        }
        else if(this.state.iceBreaker === Consts.iceBreakers.TRAP) {
            return (<IBTrapSetup 
                ReturnToSelection={this.ReturnToSelection} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchChatEvent={this.props.LaunchChatEvent}  
                user_Chat_ID={this.props.user_Chat_ID}
            /> );
        }
    }
};

export default IceBreakerSelection;