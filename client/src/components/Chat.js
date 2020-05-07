import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import InfoBar from '../InfoBar';
import Messages from '../Messages';
import Input from '../Input';

const Chat = (socket) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error)
                console.log(error);
            // else
            //     console.log("Joined room without error");
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [ENDPOINT, window.location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(`Received message: "${message}"`);
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    //console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;