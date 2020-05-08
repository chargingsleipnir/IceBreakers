import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => (
    <form className="form">
        <input 
            className="input" 
            type="text" 
            placeholder="message" 
            value={message} 
            onChange={(event) => setMessage(event.target.value)} 
            onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
);



export default Input;