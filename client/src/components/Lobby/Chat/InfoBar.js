import React from 'react';
import UserIdent from '../UserIdent';

const InfoBar = ({ ToPageUsers, user_Chat, user_Chat_Active }) => (
    <div className="text-white d-flex align-items-center pt-3 pb-3">
        <button onClick={ToPageUsers} className="btn ml-2 text-white">
            <i className="fas fa-arrow-left"></i>
        </button>
        <div className="ml-2 fontSize150"><UserIdent name={user_Chat.name + (user_Chat_Active ? "" : " [account deleted]")} imgSrc={user_Chat.imgSrc} /></div>
    </div>
);

export default InfoBar;