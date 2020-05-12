import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import InfoBar from './InfoBar';
import Message from './Message';

class Chat extends Component {
    //props: {socket, user_Chat, OnSendMessage ToPageUsers}

    state = {  msgText: "" };

    SendMessage (event) {
        event.preventDefault();

        console.log(`SendMessage called in Chat.js, msgText: "${this.state.msgText}" to user: "${this.props.user_Chat.id}"`);

        if(this.state.msgText) {
            this.props.socket.emit('SendMessage', { msgText: this.state.msgText, chatPtnrID: this.props.user_Chat.id });
            if(!this.props.user_Chat_Active)
                console.warn("Message not sent, that user has been removed from the server.");

            this.props.OnSendMessage(this.props.user_Chat.id, this.state.msgText);
            this.setState({ msgText: '' });
        }
    };

    //console.log(`Main body called in Chat.js`);

    render() {

        //console.log(this.props.user_Chat.unreadMsg);

        return (
            <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                    <div className="mw1000 m-0Auto">
                        <InfoBar ToPageUsers={this.props.ToPageUsers} user_Chat={this.props.user_Chat} user_Chat_Active={this.props.user_Chat_Active} />
                    </div>
                </div>
                <div className="flex-grow-1 bg-secondary">
                    <div className="mw1000 m-0Auto h-100 position-relative">
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
                    <form className="mw1000 m-0Auto d-flex align-items-stretch">
                        <input 
                            className="form-control form-control-lg flex-grow-1 noBorder" 
                            type="text" 
                            placeholder="message" 
                            value={this.props.user_Chat_Active ? this.state.msgText : ""} 
                            onChange={(event) => this.setState({ msgText: event.target.value })} 
                            onKeyPress={event => event.key === "Enter" ? this.SendMessage(event) : null}
                            disabled={!this.props.user_Chat_Active}
                        />
                        <button className="btn noBorder bg-white" onClick={(event) => this.SendMessage(event)} disabled={!this.props.user_Chat_Active}>
                            <i className="fas fa-paper-plane fa-lg"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Chat;