import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import IceBreakerSelection from './IceBreakerSelection';
// import IBFight_Play from './IceBreakers/Play/IB_Fight';
// import IBTrap_Play from './IceBreakers/Play/IB_Trap';

import Consts from '../../../Consts';

import UserInfoBar from './UserInfoBar';
import Message from './Message';

class Chat extends Component {

    state = {  
        msgText: "",
        preppingChatEvent: false,
        activeChatEvent: Consts.iceBreakers.NONE
    };

    //props: {socket, user_Chat, user_Chat_Active, OnSendMessage, OnSendEvent, UpdatetUser, ToPageUsers}
    constructor(props) {
        super(props);

        this.ReturnToChat = this.ReturnToChat.bind(this);
        this.LaunchIceBreaker = this.LaunchIceBreaker.bind(this);
    }

    SendMessage (event) {
        event.preventDefault();

        console.log(`SendMessage called in Chat.js, msgText: "${this.state.msgText}" to user: "${this.props.user_Chat.id}"`);

        if(this.state.msgText) {
            if(!this.props.user_Chat_Active) {
                console.warn("Message not sent, that user has been removed from the server.");
                return;
            }

            const dataObj = { type: Consts.msgTypes.TEXT, data: this.state.msgText, chatPtnrID: this.props.user_Chat.id };
            this.props.socket.emit('SendMessage', dataObj);
            this.props.OnSendMessage(dataObj);
            this.setState({ msgText: '' });
        }
    };

    // Prevent chat until it's fully played out
    // TODO: Long-term: Can cancel event if it has not yet begun by recipient.
    
    LaunchIceBreaker() {
        if(!this.props.user_Chat_Active) {
            console.warn("Event not sent, that user has been removed from the server.");
            return false;
        }

        this.props.OnSendEvent();
        this.setState({ preppingChatEvent: false });

        return true;
    }

    ChooseIceBreaker (event) {
        event.preventDefault();
        this.setState({ preppingChatEvent: true });
    }
    ReturnToChat () {
        this.setState({ preppingChatEvent: false });
    }

    render() {
        if(this.state.preppingChatEvent) {
            return (<IceBreakerSelection 
                ReturnToChat={this.ReturnToChat} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchIceBreaker={this.LaunchIceBreaker} 
                socket={this.props.socket} 
                user_Chat_ID={this.props.user_Chat.id} 
            />);
        }
        else {

            // Disable chat with this user if they left ("account" gone), or I've sent an event to them, until they complete it.
            const disabled = !this.props.user_Chat_Active || this.props.user_Chat.eventEngaged;

            return (
                <div className="h-100 d-flex flex-column justify-content-between">
                    <UserInfoBar ToPageUsers={this.props.ToPageUsers} user_Chat={this.props.user_Chat} user_Chat_Active={this.props.user_Chat_Active} />
                    <div className="flex-grow-1 bg-secondary">
                        <div className="maxW1000 m-0Auto h-100 position-relative">
                            <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="pad10">
                                { 
                                    this.props.user_Chat.messages.map((message, i) => 
                                        <div className="innerScrollItem" key={i}>
                                            <Message message={message} />
                                        </div>
                                    ) 
                                }
                            </ScrollToBottom>
                        </div>
                    </div>
                    <div className="bg-secondary">
                        <form className="maxW1000 m-0Auto d-flex align-items-stretch p-2">
                            <button className="btn noBorder bgLightBlue text-white mr-2" onClick={(event) => this.ChooseIceBreaker(event)} disabled={disabled}>
                                <i className="fas fa-handshake fa-lg"></i>
                            </button>
                            <input 
                                className="form-control form-control-lg flex-grow-1 noBorder" 
                                type="text" 
                                placeholder="message" 
                                value={this.props.user_Chat_Active ? this.state.msgText : ""} 
                                onChange={(event) => this.setState({ msgText: event.target.value })} 
                                onKeyPress={event => event.key === "Enter" ? this.SendMessage(event) : null}
                                disabled={disabled}
                            />
                            <button className="btn noBorder bg-white" onClick={(event) => this.SendMessage(event)} disabled={disabled}>
                                <i className="fas fa-paper-plane fa-lg"></i>
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
    }
};

export default Chat;