import React from 'react';
import defaultImg from '../../../images/SpeechlessGuy.png';

// TODO: Implement button to go back to the messages page
const InfoBar = ({ ToPageUsers, user_Chat }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            {/* // TODO: If they truly look the same or similar enough, make this a shared component with that found in User.js */}
            <img src={user_Chat.imgSrc || defaultImg} alt="User Avatar" width="50" height="50" />
            <h3>{ user_Chat.name }</h3>
        </div>
    </div>
);

export default InfoBar;