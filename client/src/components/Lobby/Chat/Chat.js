import React, { Component } from 'react';

import InfoBar from './InfoBar';
import Messages from './Messages';

class Chat extends Component {
    //props: {socket, user_Chat, OnSendMessage ToPageUsers}

    state = {  msgText: "" };

    // TODO: Tried using this to not update every character typed, but without "value={this.state.msgText}" set on teh input field, I can't reset the value to ''.
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.msgText === '';
    // }

    SendMessage (event) {
        event.preventDefault();

        console.log(`SendMessage called in Chat.js, msgText: "${this.state.msgText}" to user: "${this.props.user_Chat.id}"`);

        if(this.state.msgText) {
            this.props.socket.emit('SendMessage', { msgText: this.state.msgText, chatPtnrID: this.props.user_Chat.id }, (success) => {
                if(!success || !this.props.user_Chat_Active) {
                    console.warn("Message not sent, a user could not be located on the server.");
                }

                this.props.OnSendMessage(this.props.user_Chat.id, this.state.msgText);
                this.setState({ msgText: '' });
            });
        }
    };

    //console.log(`Main body called in Chat.js`);

    render() {

        //console.log(this.props.user_Chat.unreadMsg);

        return (
            <div className="outerContainer">
                <div className="container">
                    <InfoBar ToPageUsers={this.props.ToPageUsers} user_Chat={this.props.user_Chat} user_Chat_Active={this.props.user_Chat_Active} />
                    <Messages messages={this.props.user_Chat.messages} />
                    <form className="form">
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="message" 
                            value={this.props.user_Chat_Active ? this.state.msgText : ""} 
                            onChange={(event) => this.setState({ msgText: event.target.value })} 
                            onKeyPress={event => event.key === "Enter" ? this.SendMessage(event) : null}
                            disabled={!this.props.user_Chat_Active}
                        />
                        <button className="sendButton" onClick={(event) => this.SendMessage(event)} disabled={!this.props.user_Chat_Active}>Send</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Chat;