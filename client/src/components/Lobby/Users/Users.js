import React from 'react';
import User from './User';
import ScrollToBottom from 'react-scroll-to-bottom';

const Users = ({ users, LikeUserToggle, ToPageChat }) => (
    <div className="h-100 w-100 d-flex flex-column">
        <div className="head1 text-center text-white">Users</div>
        <ul className="list-group bg-secondary p-2 flex-grow-1 position-relative">
            <ScrollToBottom className="FullSpreadAbsElem" scrollViewClassName="pad10">
                { 
                    users.map((user, i) => 
                        <li className="list-group-item m-0Auto maxW1000 innerScrollItem" key={i} >
                            <User user={user} LikeUserToggle={LikeUserToggle} ToPageChat={ToPageChat} />
                        </li>
                    )
                }
            </ScrollToBottom>
        </ul>
    </div>
);

export default Users;