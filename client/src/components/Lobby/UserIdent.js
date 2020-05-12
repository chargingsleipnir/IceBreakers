import React from 'react';
import defaultImg from '../../images/SpeechlessGuy.png';

const UserIdent = ({ name, imgSrc }) => (
    <div className="d-flex align-items-center">
        <img src={imgSrc || defaultImg} className="avatarsUserIdent rounded-circle" alt="User Avatar" />
        <div className="ml-3">{name}</div>
    </div>
);

export default UserIdent;