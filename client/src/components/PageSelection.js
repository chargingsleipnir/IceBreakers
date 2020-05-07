import React, { useState } from 'react';
import { ENDPOINT, pages } from '../Consts';
import io from 'socket.io-client';
import Join from './Pages/Join';
import Users from './Pages/Users';

let socket;
socket = io(ENDPOINT);

const PageSelection = () => {
    const [page, SetPage] = useState(pages.JOIN);

    const GoToPage = toPage => {
        SetPage(toPage);
    }

    if(page === pages.JOIN)
        return ( <Join socket={socket} GoToPage={GoToPage} /> );
    else if(page === pages.USERS) {
        return ( <Users socket={socket} GoToPage={GoToPage} /> );
    }
    else if(page === pages.CHAT) {
        
    }
};

export default PageSelection;