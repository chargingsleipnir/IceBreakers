import React from 'react';
import defaultImg from '../../images/SpeechlessGuy.png';

const UserIdent = ({ name, online, imgSrc, imgIsPortrait }) => (
    <div className="d-flex flex-wrap align-items-center">
        <div className="avatarsUserIdent rounded-circle">
            <img src={imgSrc || defaultImg} alt="User Avatar" className={imgIsPortrait ? "portrait" : ""} />
        </div>
        <div className="ml-3">
            <div>{name}</div>
            <small>{online ? "" : " [offline]"}</small>
        </div>
    </div>
);

export default UserIdent;