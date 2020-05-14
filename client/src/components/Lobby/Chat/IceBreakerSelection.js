import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { iceBreakers } from '../../../Consts';

class ChooseIceBreaker extends Component {

    state = {
        iceBreaker: iceBreakers.NONE
    }

    // props: user_Chat_Active
    constructor(props) {
        super(props);
    }

    render() {
        if(this.state.iceBreaker === iceBreakers.NONE) {
            return (
                <div className="h-100 w-100 d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <button onClick={this.props.ReturnToChat} className="btn ml-2 text-white">
                            <i className="fas fa-arrow-left fa-lg"></i>
                        </button>
                        <h1 className="flex-grow-1 text-center text-white">Ice Breakers</h1>
                    </div>
                    <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                        <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="d-flex flex-column pad10">
                            {/* FIGHT */}
                            <button type="button" className="btn btn-lg btn-light m-0Auto minW50pct maxW1000 innerScrollItem" disabled={!this.props.user_Chat_Active}>
                                <i className="fas fa-fist-raised fa-rotate-270 fa-lg"></i>
                                <span className="ml-4">FIGHT</span>
                            </button>
                            {/* TRAP */}
                            <button type="button" className="btn btn-lg btn-light m-0Auto mt-2 minW50pct maxW1000 innerScrollItem" disabled={!this.props.user_Chat_Active}>
                                <i className="fas fa-dungeon fa-lg"></i>
                                <span className="ml-4">TRAP</span>
                            </button>
                        </ScrollToBottom>
                    </div>
                </div>
            );
        }
        else if(this.state.iceBreaker === iceBreakers.FIGHT) {
        }
        else if(this.state.iceBreaker === iceBreakers.TRAP) {
        }
    }
};

export default ChooseIceBreaker;