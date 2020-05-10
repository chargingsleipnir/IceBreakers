import React, { Component } from 'react';
import { pages } from '../Consts';
import Users from './Lobby/Users/Users';
import Chat from './Lobby/Chat/Chat';
import ChooseIceBreaker from './Lobby/IceBreakerSelection';

class PageSelection extends Component {

    state = {
        page: pages.USERS,
        users: [],
        user_Chat: null
    };

    // socket
    constructor(props) {
        super(props);

        // All messaging is saved per user, and effects by the users page by way of a "new message" indicator, and of course the chat page.
        props.socket.on("RecNewUser", (user) => {
            console.log(`Adding user: "${user.id}"`);
            this.setState({ users: [...this.state.users, user] });
        });
        props.socket.on("RemoveUser", (userID) => {
            console.log(`Removing user: "${userID}"`);
            let removeIndex = this.state.users.findIndex((user) => user.id === userID);
            this.state.users.splice(removeIndex, 1);
            this.setState({ users: this.state.users });
        });
        props.socket.on("RecLikeToggle", (userData) => {
            console.log(`Liked by user: "${userData.socketID}"`);
            let changeIndex = this.state.users.findIndex((user) => user.id === userData.socketID);
            this.state.users[changeIndex].likesMe = userData.likesMe;
            this.setState({ users: this.state.users });

            // TODO: I can also check if I'm in conversation with the other user and shut if down if need be.
            //* The conversation doesn't necessarily need to be forcibly shut down at this point? Maybe just some other way of indicating the unmatch has taken place.
        });

        props.socket.emit("GetUsers", {}, (users) => {
            for(let i = 0; i < users.length; i++) {
                console.log(`Adding users: "${users[i].id}"`);
                //console.log(`User image src: "${users[i].imgSrc}"`);
            }

            this.setState({ users });
        });

        props.socket.on('RecMessage', (data) => {
            console.log(`Received message: "${data.msgText}" from user: "${data.senderID}"`);
            let changeIndex = this.state.users.findIndex((user) => user.id === data.senderID);
            this.state.users[changeIndex].messages.push({ msgText: data.msgText, fromSender: false });
            
            // If the sender of that message is someone I'm not currently in chat with, indicate that I have an unread message waiting.
            let willBeRead = false;
            if(this.state.user_Chat)
                if(this.state.user_Chat.id === data.senderID)
                    willBeRead = true;

            if(!willBeRead)
                this.state.users[changeIndex].unreadMsg = true;

            this.setState({ users: this.state.users });
        });

        this.ToPageChat = this.ToPageChat.bind(this);
        this.OnSendMessage = this.OnSendMessage.bind(this);
    }

    ToPageUsers () {

    };

    ToPageChat (user_Chat) {
        this.setState(prevState => ({ 
            users: prevState.users.map((elem) => elem.id === user_Chat.id ? {...elem, unreadMsg: false } : elem), 
            user_Chat, 
            page: pages.CHAT 
        }));
    }

    OnSendMessage (userToID, msgText) {
        console.log(`Sent message: "${msgText}" to user: "${userToID}"`);
        let changeIndex = this.state.users.findIndex(({ id }) => id === userToID);
        this.state.users[changeIndex].messages.push({ msgText, fromSender: true });
        this.setState({ users: this.state.users });
    }

    render() {
        if(this.state.page === pages.USERS)
            return ( <Users socket={this.props.socket} users={this.state.users} ToPageChat={this.ToPageChat} /> );
        else if(this.state.page === pages.CHAT)
            return ( <Chat socket={this.props.socket} user_Chat={this.state.user_Chat} OnSendMessage={this.OnSendMessage} ToPageUsers={this.ToPageUsers} /> );
        else if(this.state.page === pages.CHOOSE_ICEBREAKER)
            return ( <ChooseIceBreaker /> );
    }
};

export default PageSelection;