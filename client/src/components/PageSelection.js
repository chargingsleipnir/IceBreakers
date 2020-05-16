import React, { Component } from 'react';
import Consts from '../Consts';
import Users from './Lobby/Users/Users';
import Chat from './Lobby/Chat/Chat';

class PageSelection extends Component {

    state = {
        page: Consts.pages.USERS,
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

            //* In lieu of this, check if the user_Chat is still in the general users list, and if not, disable the chat features, but just leave the existing messages up.
            // if(this.state.user_Chat)
            //     if(this.state.user_Chat.id === userID)
            //         this.setState({ user_Chat: null });
        });
        props.socket.on("RecLikeToggle", (userData) => {
            console.log(`Liked by user: "${userData.socketID}"`);
            let changeIndex = this.state.users.findIndex((user) => user.id === userData.socketID);
            this.state.users[changeIndex].likesMe = userData.likesMe;
            this.setState({ users: this.state.users });
        });

        props.socket.emit("GetUsers", {}, (users) => {
            for(let i = 0; i < users.length; i++) {
                console.log(`Adding users: "${users[i].id}"`);
                //console.log(`User image src: "${users[i].imgSrc}"`);
            }

            this.setState({ users });
        });

        // TODO: Make only one call from the server, 'RecMessage'
        // That call sends the chatPtnrID, a type, and data.
        // The type is what kind of message (text, fight, trap, etc.)
        // And the data will futher specify (test:message, ice breaker:details of which step they're on)
        // Data sent to the message component, where it's read and deciphered and html is built

        props.socket.on('RecMessage', (data) => {
            console.log(`Received message, type: "${data.type}" chatting with user: "${data.chatPtnrID}", sent from self?: ${data.fromSelf}, with data:`, data.data);
            
            let changeIndex = this.state.users.findIndex((user) => user.id === data.chatPtnrID);
            this.state.users[changeIndex].messages.push(data);
            
            // If the sender of that message is someone I'm not currently in chat with, indicate that I have an unread message waiting.
            let willBeRead = false;
            if(this.state.user_Chat)
                if(this.state.user_Chat.id === data.chatPtnrID)
                    willBeRead = true;

            this.state.users[changeIndex].unreadMsg = !willBeRead;

            this.setState({ users: this.state.users });
        });

        this.ToPageUsers = this.ToPageUsers.bind(this);
        this.LikeUserToggle = this.LikeUserToggle.bind(this);
        this.ToPageChat = this.ToPageChat.bind(this);
        this.OnSendMessage = this.OnSendMessage.bind(this);
        this.OnSendEvent = this.OnSendEvent.bind(this);
        this.UpdatetUser = this.UpdatetUser.bind(this);
    }

    ToPageUsers () {
        this.setState({ 
            user_Chat: null, 
            page: Consts.pages.USERS 
        });
    };

    LikeUserToggle (userID, isLiked) {
        this.props.socket.emit("LikeUserToggle", { userID, isLiked });
        this.setState(prevState => ({ 
            users: prevState.users.map((elem) => elem.id === userID ? {...elem, likeThem: isLiked } : elem)
        }));
    };

    // User_chat being set from this param.
    ToPageChat (user_Chat) {
        this.setState(prevState => ({ 
            users: prevState.users.map((elem) => elem.id === user_Chat.id ? {...elem, unreadMsg: false } : elem),
            user_Chat, 
            page: Consts.pages.CHAT 
        }));
    }

    // User_chat and that user within the list updated.
    UpdatetUser (user_Chat) {
        this.setState(prevState => ({ 
            users: prevState.users.map((elem) => elem.id === user_Chat.id ? user_Chat : elem),
            user_Chat
        }));
    }

    // Update my own message view, not required from server
    OnSendMessage (dataObj) {
        //console.log(`Sent message: "${msgText}" to user: "${this.state.user_Chat.id}"`);
        let changeIndex = this.state.users.findIndex(({ id }) => id === this.state.user_Chat.id);
        this.state.users[changeIndex].messages.push({ ...dataObj, fromSelf: true });
        this.setState({ users: this.state.users });
    }

    // TODO: Update my own message view with indication of event being sent, not required for receiver.
    OnSendEvent () {
        this.setState(prevState => ({ 
            users: prevState.users.map((elem) => elem.id === this.state.user_Chat.id ? {...elem, eventEngaged: true } : elem),
            user_Chat: { ...prevState.user_Chat, eventEngaged: true }
        }));
    }

    render() {
        if(this.state.page === Consts.pages.USERS)
            return ( <Users users={this.state.users} LikeUserToggle={this.LikeUserToggle} ToPageChat={this.ToPageChat} /> );
        else if(this.state.page === Consts.pages.CHAT) {
            // Re-render if the user goes offline while being chatted with.
            let user_Chat_Active = true;
            if(this.state.user_Chat)
                if(this.state.users.findIndex(({ id }) => id === this.state.user_Chat.id) === -1)
                    user_Chat_Active = false;

            return (<Chat 
                socket={this.props.socket}
                user_Chat={this.state.user_Chat}
                user_Chat_Active={user_Chat_Active}
                OnSendMessage={this.OnSendMessage}
                OnSendEvent={this.OnSendEvent}
                UpdatetUser={this.UpdatetUser}
                ToPageUsers={this.ToPageUsers} 
            />);
        }
    }
};

export default PageSelection;