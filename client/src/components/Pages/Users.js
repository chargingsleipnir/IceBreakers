import React, { Component } from 'react';
import User from '../User';
import ScrollToBottom from 'react-scroll-to-bottom';

class Users extends Component {

    state = { users: [] };

    constructor(props) {
        super(props);

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
    }

    render() {
        return (
            <div className="UsersOuterContainer">
                <div className="UsersInnerContainer">
                    <h1 className="heading">Users</h1>
                    <ul>
                    <ScrollToBottom className="users">
                        { 
                            this.state.users.map((user, i) => 
                                <li key={i} >
                                    <User socket={this.props.socket} user={user} GoToPage={this.props.GoToPage} />
                                </li>
                            )
                        }
                    </ScrollToBottom>
                    </ul>
                </div>
            </div>
        );
    }
}

// const Users = ({socket, GoToPage}) => {
//     const [users, SetUsers] = useState([]);

//     /*
//     User:
//     name: name,
//     imgExt: null,
//     matches: [],
//     matchChatID: -1
//     */
//     socket.on("RecNewUser", (user) => {
//         console.log(`Adding user: "${user.id}"`);
//         SetUsers([...users, user]);
//     });
//     // socket.emit("GetUsers", {}, (users) => {
//     //     console.log(`Adding users: "${users}"`);
//     //     SetUsers(users);
//     // });

//     console.log("Users component function body.");

//     return (
//         <div className="UsersOuterContainer">
//             <div className="UsersInnerContainer">
//                 <h1 className="heading">Users</h1>
//                 <ul>
//                 <ScrollToBottom className="users">
//                     { users.map((user, i) => <User key={i} user={user} GoToPage={GoToPage} />) }
//                 </ScrollToBottom>
//                 </ul>
//             </div>
//         </div>
//     );
// };

export default Users;