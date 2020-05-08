import React, { useState } from 'react';
import { pages } from '../Consts';
import defaultImg from '../images/SpeechlessGuy.png';

const User = ({socket, user, GoToPage}) => {
    const [likeThem, SetLikeThem] = useState(false);

    const likeBtnFntAwsName = likeThem ? "fas fa-heart" : "far fa-heart";

    const mutual = likeThem && user.likesMe;
    const speechBtnFntAwsName = mutual ? "fas fa-comment" : "fas fa-comment-slash";

    const LikeUser = () => {
        socket.emit("LikeUserToggle", user.id, (userLiked) => {
            SetLikeThem(userLiked);
        });
    };

    return (
        <div>
            <div>
                <img src={user.imgSrc || defaultImg} alt="User Avatar" width="50" height="50" />
                <div>{user.name}</div>
            </div>
            <div>
                <button className="mt-2" onClick={LikeUser}>
                    <i className={likeBtnFntAwsName}></i>
                </button>
                <button className="mt-2" onClick={() => { GoToPage(pages.CHAT); }} disabled={!mutual} >
                    <i className={speechBtnFntAwsName}></i>
                    {/* //TODO: Add dot indicator that a message has been recieved.  */}
                </button>
            </div>
        </div>
    );
};

export default User;