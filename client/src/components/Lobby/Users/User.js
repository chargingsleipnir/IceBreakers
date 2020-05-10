import React from 'react';
import defaultImg from '../../../images/SpeechlessGuy.png';

const User = ({user, LikeUserToggle, ToPageChat}) => {

    let html_likeBtnVisual = user.likeThem ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>;

    const mutual = user.likeThem && user.likesMe;
    const  html_SpeechBtnVisual = mutual ? <i className="fas fa-comment"></i> : <i className="fas fa-comment-slash"></i>;

    const html_UnreadMsgNotif = user.unreadMsg ? <span className="notificationBadge"></span> : "";

    return (
        <div>
            <div>
                <img src={user.imgSrc || defaultImg} alt="User Avatar" width="50" height="50" />
                <div>{user.name}</div>
            </div>
            <div>
                <button className="mt-2" onClick={() => { LikeUserToggle(user.id, !user.likeThem); }}>
                    { html_likeBtnVisual }
                </button>
                <button className="mt-2 position-relative" onClick={() => { ToPageChat(user); }} disabled={!mutual} >
                    { html_SpeechBtnVisual }
                    { html_UnreadMsgNotif }
                </button>
            </div>
        </div>
    );
};

export default User;