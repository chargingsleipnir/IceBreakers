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

        props.socket.on('RecMessage', (recObj) => {
            console.log(`Received message, type: "${recObj.msgData.type}" chatting with user: "${recObj.msgData.chatPtnrID}", with data:`, recObj.msgData.data);
            
            this.setState((prevState) => {

                let changeIndex = prevState.users.findIndex(({ id }) => id === recObj.msgData.chatPtnrID);
                const moddedMsgObj = { ...recObj.msgData, fromSelf: false };
    
                // Hold event in seperate container while it's running, and build messages up as it executes.
                if(recObj.isEvent) {
                    prevState.users[changeIndex].chatEvent = moddedMsgObj;
                    prevState.users[changeIndex].disableSend = true;
                }
                else {
                    prevState.users[changeIndex].messages.push(moddedMsgObj);
                }

                var unreadMsg = true;
                if(this.state.user_Chat) {
                    if(this.state.user_Chat.id === recObj.msgData.chatPtnrID)
                        unreadMsg = false;
                }

                prevState.users[changeIndex].unreadMsg = unreadMsg
    
                return { 
                    users: prevState.users,
                    user_Chat: unreadMsg === false ? prevState.users[changeIndex] : null
                }
            }); 
        });

        props.socket.on('RecClearEvent', (chatPtnrID) => {
            this.setState((prevState) => {
                let changeIndex = prevState.users.findIndex(({ id }) => id === chatPtnrID);
                prevState.users[changeIndex].chatEvent = null;
                prevState.users[changeIndex].disableSend = false;
    
                return { 
                    users: prevState.users,
                    user_Chat: prevState.users[changeIndex]
                } 
            });
        });

        this.ToPageUsers = this.ToPageUsers.bind(this);
        this.LikeUserToggle = this.LikeUserToggle.bind(this);
        this.ToPageChat = this.ToPageChat.bind(this);
        this.SendMessage = this.SendMessage.bind(this);
        this.ClearEvent = this.ClearEvent.bind(this);
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

    // Update my own message view, not required from server
    SendMessage (msgData, isEvent) {
        
        this.props.socket.emit('SendMessage', {
            msgData: { ...msgData, chatPtnrID: this.state.user_Chat.id },
            isEvent 
        });

        this.setState((prevState) => {
            
            let changeIndex = prevState.users.findIndex(({ id }) => id === prevState.user_Chat.id);
            const moddedMsgObj = { ...msgData, fromSelf: true };

            if(isEvent) {
                prevState.users[changeIndex].chatEvent = moddedMsgObj;
                prevState.users[changeIndex].disableSend = true;
            }
            else {
                prevState.users[changeIndex].messages.push(moddedMsgObj);
            }

            //console.log(prevState);

            return { 
                users: prevState.users,
                user_Chat: prevState.users[changeIndex]
            } 
        });
    }

    // Update my own message view, not required from server
    ClearEvent () {
        this.props.socket.emit('ClearEvent', this.state.user_Chat.id);

        this.setState((prevState) => {
            
            let changeIndex = prevState.users.findIndex(({ id }) => id === prevState.user_Chat.id);
            prevState.users[changeIndex].chatEvent = null;
            prevState.users[changeIndex].disableSend = false;

            return { 
                users: prevState.users,
                user_Chat: prevState.users[changeIndex]
            } 
        });
    }

    render() {
        //console.log(this.state);
        if(this.state.page === Consts.pages.USERS)
            return ( <Users users={this.state.users} LikeUserToggle={this.LikeUserToggle} ToPageChat={this.ToPageChat} /> );
        else if(this.state.page === Consts.pages.CHAT) {
            // Re-render if the user goes offline while being chatted with.
            let user_Chat_Active = true;
            if(this.state.user_Chat)
                if(this.state.users.findIndex(({ id }) => id === this.state.user_Chat.id) === -1)
                    user_Chat_Active = false;

            return (<Chat 
                user_Chat={this.state.user_Chat}
                user_Chat_Active={user_Chat_Active}
                SendMessage={this.SendMessage}
                ClearEvent={this.ClearEvent}
                ToPageUsers={this.ToPageUsers}
            />);
        }
    }
};

export default PageSelection;