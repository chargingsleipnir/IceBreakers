import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { iceBreakers } from '../../../Consts';
import PageTitleBar from './PageTitleBar';
import IBFight from './IceBreakers/IB_Fight';
import IBTrap from './IceBreakers/IB_Trap';

class ChooseIceBreaker extends Component {

    state = {
        iceBreaker: iceBreakers.NONE
    }

    // props: user_Chat_Active
    constructor(props) {
        super(props);

        this.ReturnToSelection = this.ReturnToSelection.bind(this);
    }

    ReturnToSelection() {
        this.setState({ iceBreaker: iceBreakers.NONE });
    }

    render() {
        if(this.state.iceBreaker === iceBreakers.NONE) {
            return (
                <div className="h-100 w-100 d-flex flex-column">
                    <PageTitleBar BackFunc={this.props.ReturnToChat} title='Ice Breakers' />
                    <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                        <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="d-flex flex-column pad10">
                            {/* FIGHT */}
                            <button 
                                type="button"
                                className="btn btn-lg bgLightBlue text-white m-0Auto minW50pct maxW1000 innerScrollItem"
                                onClick={(event) => this.setState({ iceBreaker: iceBreakers.FIGHT })}
                                disabled={!this.props.user_Chat_Active}
                            >
                                <i className="fas fa-fist-raised fa-lg transFlipYRot90"></i>
                                <span className="ml-4">FIGHT</span>
                            </button>
                            {/* TRAP */}
                            <button
                                type="button"
                                className="btn btn-lg bgLightBlue text-white m-0Auto mt-2 minW50pct maxW1000 innerScrollItem"
                                onClick={(event) => this.setState({ iceBreaker: iceBreakers.TRAP })}
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
        else if(this.state.iceBreaker === iceBreakers.FIGHT) {
            return ( <IBFight ReturnToSelection={this.ReturnToSelection} /> );
        }
        else if(this.state.iceBreaker === iceBreakers.TRAP) {
            return ( <IBTrap ReturnToSelection={this.ReturnToSelection} /> );
        }
    }
};

export default ChooseIceBreaker;