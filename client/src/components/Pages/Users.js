import React, { Component } from 'react';
import User from '../User';
import ScrollToBottom from 'react-scroll-to-bottom';

class Users extends Component {

    state = { users: [] };

    constructor(props) {
        super(props);

        props.socket.on("RecNewUser", (user) => {
            console.log(`Adding user: "${user.id}"`);
            console.log(`User image src: "${user.imgSrc}"`);
            this.setState({ users: [...this.state.users, user] });
        });
        props.socket.on("RemoveUser", (userID) => {
            console.log(`Removing user: "${userID}"`);
            let removeIndex = this.state.users.findIndex((user) => user.id === userID);
            this.state.users.splice(removeIndex, 1);
            this.setState({ users: this.state.users });
        });

        props.socket.emit("GetUsers", {}, (users) => {
            for(let i = 0; i < users.length; i++) {
                console.log(`Adding users: "${users[i].id}"`);
                console.log(`User image src: "${users[i].imgSrc}"`);
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
                                <li key={i} data-socketid={user.id}>
                                    <User user={user} GoToPage={this.props.GoToPage} />
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