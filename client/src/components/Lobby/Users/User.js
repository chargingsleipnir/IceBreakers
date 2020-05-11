import React from 'react';
import defaultImg from '../../../images/SpeechlessGuy.png';

const User = ({user, LikeUserToggle, ToPageChat}) => {

    let html_likeBtnVisual = user.likeThem ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>;

    const mutual = user.likeThem && user.likesMe;
    const  html_SpeechBtnVisual = mutual ? <i className="fas fa-comment"></i> : <i className="fas fa-comment-slash"></i>;

    const html_UnreadMsgNotif = user.unreadMsg ? <span className="notificationBadge"></span> : "";

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <img src={user.imgSrc || defaultImg} id="AvatarsUserList" className="rounded-circle" alt="User Avatar" />
                <div className="ml-3">{user.name}</div>
            </div>
            <div className="d-flex align-items-center">
                <button className="btn" onClick={() => { LikeUserToggle(user.id, !user.likeThem); }}>
                    { html_likeBtnVisual }
                </button>
                <button className="btn position-relative" onClick={() => { ToPageChat(user); }} disabled={!mutual} >
                    { html_SpeechBtnVisual }
                    { html_UnreadMsgNotif }
                </button>
            </div>
        </div>
    );
};

export default User;