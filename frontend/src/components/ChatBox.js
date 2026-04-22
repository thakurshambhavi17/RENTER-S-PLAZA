import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import './ChatBox.css';

const ChatBox = ({ receiverId, receiverName }) => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        if (!user || !receiverId) return;
        
        const ids = [user.id, receiverId].sort((a,b) => a - b);
        const roomName = `${ids[0]}_${ids[1]}`;
        
        ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
        
        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages(prev => [...prev, data]);
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, [user, receiverId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && ws.current) {
            ws.current.send(JSON.stringify({
                message: input,
                sender_id: user.id,
                receiver_id: receiverId
            }));
            setInput('');
        }
    };

    if (!user) return null;

    return (
        <div className="chat-box glass-panel">
            <div className="chat-header">
                <h3>Chat with {receiverName}</h3>
            </div>
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender_id === user.id ? 'sent' : 'received'}`}>
                        <div className="message-content">{msg.message}</div>
                    </div>
                ))}
            </div>
            <form className="chat-input" onSubmit={sendMessage}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Type a message..." 
                    className="input-field"
                />
                <button type="submit" className="btn-primary">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
