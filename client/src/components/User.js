import React from 'react';
import { pages } from '../Consts';
import defaultImg from '../images/SpeechlessGuy.png';

const User = ({user, GoToPage}) => (
    <div>
        <div>
            <img src={user.imgSrc || defaultImg} alt="User Avatar" width="50" height="50" />
            <div>{user.name}</div>
        </div>
        <div>
            {/* // TODO: Include buttons, right aligned */}
            {/* Like (request match) */}
            {/* Chat */}
        </div>
    </div>
);

export default User;