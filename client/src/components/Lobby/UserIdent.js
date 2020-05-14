import React from 'react';
import defaultImg from '../../images/SpeechlessGuy.png';

const UserIdent = ({ name, imgSrc }) => (
    <div className="d-flex flex-wrap align-items-center">
        <div className="avatarsUserIdent rounded-circle">
            <img src={imgSrc || defaultImg} alt="User Avatar" />
        </div>
        <div className="ml-3">{name}</div>
    </div>
);

export default UserIdent;