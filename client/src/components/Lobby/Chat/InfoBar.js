import React from 'react';
import defaultImg from '../../../images/SpeechlessGuy.png';

const InfoBar = ({ ToPageUsers, user_Chat, user_Chat_Active }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <button onClick={ToPageUsers}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <img src={user_Chat.imgSrc || defaultImg} alt="User Avatar" width="50" height="50" />
            <h3>{ user_Chat.name + (user_Chat_Active ? "" : " [account deleted]") }</h3>
        </div>
    </div>
);

export default InfoBar;