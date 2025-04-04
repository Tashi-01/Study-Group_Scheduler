const axios = require('axios');

// Chat with Ollama
const chatWithOllama = async (req, res) => {
    const { message } = req.body;
    
    console.log('Received message:', message);  // Log to check if the message is received

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const messages = [
            { role: 'user', content: message }
        ];

        const response = await axios.post('https://localhost:11434/api/chat', {
            model: 'llama2',
            messages: messages,
            stream: false
        });

        const reply = response.data.message.content;

        console.log('Received reply:', reply); // Log the reply

        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to communicate with Ollama' });
    }
};


module.exports = { chatWithOllama };
