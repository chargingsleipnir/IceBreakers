import React from 'react';
import User from './User';
import ScrollToBottom from 'react-scroll-to-bottom';

const Users = ({ socket, users, ToPageChat }) => (
    <div className="UsersOuterContainer">
        <div className="UsersInnerContainer">
            <h1 className="heading">Users</h1>
            <ul>
            <ScrollToBottom className="users">
                { 
                    users.map((user, i) => 
                        <li key={i} >
                            <User socket={socket} user={user} ToPageChat={ToPageChat} />
                        </li>
                    )
                }
            </ScrollToBottom>
            </ul>
        </div>
    </div>
);

export default Users;