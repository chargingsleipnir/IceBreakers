import React from 'react';
import UserIdent from '../UserIdent';

const UserInfoBar = ({ ToPageUsers, user_Chat, user_Chat_Active }) => (
    <div>
        <div className="maxW1000 m-0Auto">
            <div className="text-white d-flex align-items-center pt-3 pb-3">
                <button onClick={ToPageUsers} className="btn ml-2 text-white">
                    <i className="fas fa-arrow-left fa-lg"></i>
                </button>
                <div className="ml-2 fontSize150"><UserIdent name={user_Chat.name} online={user_Chat_Active} imgSrc={user_Chat.imgSrc} imgIsPortrait={user_Chat.isPortrait} /></div>
            </div>
        </div>
    </div>
);

export default UserInfoBar;