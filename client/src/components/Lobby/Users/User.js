import React from 'react';
import UserIdent from '../UserIdent';

const User = ({user, LikeUserToggle, ToPageChat}) => {

    let html_likeBtnVisual = user.likeThem ? <i className="fas fa-heart fa-lg"></i> : <i className="far fa-heart fa-lg"></i>;

    const mutual = user.likeThem && user.likesMe;
    const  html_SpeechBtnVisual = mutual ? <i className="fas fa-comment fa-lg fa-fw"></i> : <i className="fas fa-comment-slash fa-lg fa-fw"></i>;

    const html_UnreadMsgNotif = user.unreadMsg ? <span className="notificationBadge"></span> : "";

    return (
        <div className="d-flex justify-content-between align-items-center">
            <UserIdent name={user.name} imgSrc={user.imgSrc} />
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