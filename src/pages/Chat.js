import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
    
        try {
            const response = await axios.post('/api/chat/chat', { message });
            const { reply } = response.data;
    
            setChatHistory([...chatHistory, { userMessage: message, botReply: reply }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);  // Log the error
            setError('Failed to send message. Please try again.');
        }
    };
    
    

    return (
        <div className="chat-container">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {chat.userMessage}</p>
                        <p><strong>Ollama:</strong> {chat.botReply}</p>
                    </div>
                ))}
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
