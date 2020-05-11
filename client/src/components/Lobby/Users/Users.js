import React from 'react';
import User from './User';
import ScrollToBottom from 'react-scroll-to-bottom';

const Users = ({ users, LikeUserToggle, ToPageChat }) => (
    <div className="h-100 w-100 d-flex flex-column">
        <h1 className="text-center text-white">Users</h1>
        <ul className="list-group bg-secondary flex-grow-1 w-100 p-2">
            <ScrollToBottom>
                { 
                    users.map((user, i) => 
                        <li className="list-group-item" key={i} >
                            <User user={user} LikeUserToggle={LikeUserToggle} ToPageChat={ToPageChat} />
                        </li>
                    )
                }
            </ScrollToBottom>
        </ul>
    </div>
);

export default Users;