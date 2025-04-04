import React, { useState } from "react";
import axios from "axios";

function Chat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;  // Prevent empty messages
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/chat", { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Chat error:", error);
            setResponse("Error: Could not get a response.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Chat with AI</h2>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..." 
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }} 
            />
            <button onClick={sendMessage} disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
                {loading ? "Sending..." : "Send"}
            </button>
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
                <strong>Response:</strong>
                <p>{response || "No response yet"}</p>
            </div>
        </div>
    );
}

export default Chat;
