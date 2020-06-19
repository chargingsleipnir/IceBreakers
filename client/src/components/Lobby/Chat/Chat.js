import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import * as Consts from '../../../Consts';

import UserInfoBar from './UserInfoBar';
import Message from './Message';

import IceBreakerSelection from './IceBreakerSelection';
import IBFightEngage from './IceBreakers/Fight/Engage';
import IBTrapEngage from './IceBreakers/Trap/Engage';
import IBBlankEngage from './IceBreakers/Blank/Engage';

class Chat extends Component {

    state = {  
        msgText: "",
        preppingChatEvent: false
    };

    //props: {user_Chat, user_Chat_Active, PreppingCE, SendMessage, ToPageUsers}
    constructor(props) {
        super(props);

        this.SendText = this.SendText.bind(this);
        this.LaunchChatEvent = this.LaunchChatEvent.bind(this);
        this.ChooseIceBreaker = this.ChooseIceBreaker.bind(this);
        this.ReturnToChat = this.ReturnToChat.bind(this);
    }

    // Specific to this class, wherin it resets the msgText
    SendText (event) {
        event.preventDefault();
        if(!this.state.msgText) {
            console.warn("Message not sent, must send more than nothing.");
            return;
        }
        if(!this.props.user_Chat_Active) {
            console.warn("Message not sent, that user has been removed from the server.");
            return;
        }

        console.log(`SendMessage called in Chat.js, msgText: "${this.state.msgText}" to user: "${this.props.user_Chat.id}"`);

        this.setState({ msgText: '' });
        this.props.SendMessage({ 
            type: Consts.msgTypes.TEXT, 
            data: this.state.msgText
        }, false);
    };

    // Specific to chat events, wherin the age returns here once they are sent, and chat with this user is disabled until the event is complete.
    // TODO: Long-term: Can cancel event if it has not yet begun by recipient.
    LaunchChatEvent(dataObj, asEvent) {
        if(!this.props.user_Chat_Active) {
            console.warn("Message not sent, that user has been removed from the server.");
            return;
        }
        
        this.setState({ preppingChatEvent: false });
        this.props.SendMessage(dataObj, asEvent);
    }

    ChooseIceBreaker (event) {
        event.preventDefault();
        this.setState({ preppingChatEvent: true });
        this.props.PreppingCE(this.props.user_Chat.id, true);
    }
    ReturnToChat () {
        this.setState({ preppingChatEvent: false });
        this.props.PreppingCE(this.props.user_Chat.id, false);
    }

    render() {
        if(this.state.preppingChatEvent) {
            return (<IceBreakerSelection 
                ReturnToChat={this.ReturnToChat} 
                user_Chat_Active={this.props.user_Chat_Active} 
                LaunchChatEvent={this.LaunchChatEvent} 
            />);
        }
        else {

            // Disable chat with this user if they left ("account" gone), or I've sent an event to them, until they complete it.
            const disabled = !this.props.user_Chat_Active || this.props.user_Chat.disableSend;
            const disableCE = this.props.user_Chat ? this.props.user_Chat.isPreppingCE : false;

            // TODO: Event will play out once an ice breaker is selected.
            //* Each Step (managed internally) will produce a resulting message, ideally the same message for both sender and Receiver
            //* For example, and event step is a button/option, which when selected, is replaced with a message indicating what that selection was.
            //* -1 event step, +1 message

            // Rendering considerations:
            // Sender event step - Should maybe just be a small message of what the receiver can do (e.g. "Selecting move") - Can easily be created as each new event message comes in.
            // Sender message - Mostly the same for both parties
            // Receiver event step - Interactive elements leading into messages
            // Receiver message - Mostly the same for both parties

            var chatEvent = "";
            //console.log(this.props.user_Chat)
            if(this.props.user_Chat.chatEvent && this.props.user_Chat.chatEventDisp) {
                const evt = this.props.user_Chat.chatEvent;
                //console.log(evt.type)
                if(evt.type === Consts.msgTypes.CE_FIGHT)
                    chatEvent = <IBFightEngage 
                        eventData={evt} 
                        SendMessage={this.props.SendMessage} 
                        UpdateEventData={this.props.UpdateEventData} 
                        ClearEvent={this.props.ClearEvent} 
                        chatPtnrName={this.props.user_Chat.name} 
                    />;
                else if(evt.type === Consts.msgTypes.CE_TRAP)
                    chatEvent = <IBTrapEngage 
                        eventData={evt} 
                        SendMessage={this.props.SendMessage} 
                        UpdateEventData={this.props.UpdateEventData} 
                        ClearEvent={this.props.ClearEvent} 
                        chatPtnrName={this.props.user_Chat.name} 
                    />;
                else if(evt.type === Consts.msgTypes.CE_BLANK)
                    chatEvent = <IBBlankEngage 
                        eventData={evt} 
                        SendMessage={this.props.SendMessage} 
                        UpdateEventData={this.props.UpdateEventData} 
                        ClearEvent={this.props.ClearEvent} 
                        chatPtnrName={this.props.user_Chat.name} 
                    />;
            }

            return (
                <div className="h-100 d-flex flex-column justify-content-between">
                    <UserInfoBar ToPageUsers={this.props.ToPageUsers} user_Chat={this.props.user_Chat} user_Chat_Active={this.props.user_Chat_Active} />
                    <div className="flex-grow-1 bg-secondary">
                        <div className="maxW1000 m-0Auto h-100 position-relative">
                            <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="pad10">
                                { 
                                    this.props.user_Chat.messages.map((message, i) => 
                                        <div className="innerScrollItem" key={i}>
                                            <Message message={message} chatPtnrName={this.props.user_Chat.name} />
                                        </div>
                                    )
                                }
                                <div className="innerScrollItem"> 
                                    {chatEvent}
                                </div>
                            </ScrollToBottom>
                        </div>
                    </div>
                    <div className="bg-secondary">
                        <form className="maxW1000 m-0Auto d-flex align-items-stretch p-2">
                            <button className="btn noBorder bgLightBlue text-white mr-2" onClick={this.ChooseIceBreaker} disabled={disabled || disableCE}>
                                <i className="fas fa-handshake fa-lg"></i>
                            </button>
                            <input 
                                className="form-control form-control-lg flex-grow-1 noBorder" 
                                type="text" 
                                placeholder="message" 
                                value={this.props.user_Chat_Active ? this.state.msgText : ""} 
                                onChange={(event) => this.setState({ msgText: event.target.value })} 
                                onKeyPress={event => event.key === "Enter" ? this.SendText(event) : null}
                                disabled={disabled}
                            />
                            <button className="btn noBorder bg-white" onClick={this.SendText} disabled={disabled}>
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