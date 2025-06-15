class Chatbot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatContainer = document.getElementById('chatContainer');
        
        this.responses = {
            greeting: [
                "Hello! How can I assist you today?",
                "Hi there! What would you like to know?",
                "Hey! I'm here to help. What's on your mind?",
                "Greetings! How may I be of service?"
            ],
            goodbye: [
                "Goodbye! Have a wonderful day!",
                "See you later! Take care!",
                "Bye! Feel free to come back anytime!",
                "Farewell! It was nice chatting with you!"
            ],
            thanks: [
                "You're very welcome! Happy to help!",
                "My pleasure! Is there anything else I can assist you with?",
                "Glad I could help! Let me know if you need anything else.",
                "You're welcome! I'm here if you have more questions."
            ],
            help: [
                "I can help you with various topics! Try asking me about:\n• General questions\n• Technology\n• Weather\n• Fun facts\n• Or just have a casual conversation!",
                "I'm here to assist! You can ask me about different topics, get information, or just chat. What interests you?",
                "I can help with many things! Feel free to ask questions, request information, or just have a friendly conversation."
            ],
            weather: [
                "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for accurate information!",
                "For current weather conditions, I suggest checking your local weather service or a reliable weather app.",
                "I can't provide live weather updates, but weather.com or your phone's weather app would have current conditions!"
            ],
            time: [
                `The current time is ${new Date().toLocaleTimeString()}.`,
                `It's currently ${new Date().toLocaleTimeString()} in your timezone.`
            ],
            default: [
                "That's interesting! Tell me more about that.",
                "I understand. Can you elaborate on that?",
                "That's a great question! While I don't have specific information about that, I'm here to help however I can.",
                "I see what you mean. Is there something specific you'd like to know?",
                "Thanks for sharing that! What else would you like to discuss?",
                "Interesting point! I'd love to hear more about your thoughts on this.",
                "I appreciate you telling me that. How can I assist you further?"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Set welcome message time
        document.getElementById('welcomeTime').textContent = this.getCurrentTime();
        
        // Focus on input
        this.messageInput.focus();
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.displayMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate bot response after a delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.displayMessage(response, 'bot');
            this.sendButton.disabled = false;
            this.messageInput.focus();
        }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
    }
    
    displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = message.replace(/\n/g, '<br>');
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            dotsContainer.appendChild(dot);
        }
        
        const typingText = document.createElement('span');
        typingText.textContent = 'AI is typing';
        typingText.style.fontSize = '12px';
        typingText.style.color = '#9CA3AF';
        typingText.style.marginLeft = '8px';
        
        typingDiv.appendChild(dotsContainer);
        typingDiv.appendChild(typingText);
        
        this.chatContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings
        if (this.containsWords(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return this.getRandomResponse('greeting');
        }
        
        // Check for goodbyes
        if (this.containsWords(lowerMessage, ['bye', 'goodbye', 'see you', 'farewell', 'take care'])) {
            return this.getRandomResponse('goodbye');
        }
        
        // Check for thanks
        if (this.containsWords(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return this.getRandomResponse('thanks');
        }
        
        // Check for help
        if (this.containsWords(lowerMessage, ['help', 'assist', 'support', 'what can you do'])) {
            return this.getRandomResponse('help');
        }
        
        // Check for weather
        if (this.containsWords(lowerMessage, ['weather', 'temperature', 'forecast', 'rain', 'sunny'])) {
            return this.getRandomResponse('weather');
        }
        
        // Check for time
        if (this.containsWords(lowerMessage, ['time', 'clock', 'what time'])) {
            return this.getRandomResponse('time');
        }
        
        // Check for name questions
        if (this.containsWords(lowerMessage, ['your name', 'who are you', 'what are you'])) {
            return "I'm an AI assistant created to help answer questions and have conversations. You can call me Bot!";
        }
        
        // Check for how are you
        if (this.containsWords(lowerMessage, ['how are you', 'how do you feel'])) {
            return "I'm doing great, thank you for asking! I'm here and ready to help. How are you doing today?";
        }
        
        // Check for age
        if (this.containsWords(lowerMessage, ['your age', 'how old'])) {
            return "I don't have an age in the traditional sense since I'm an AI, but I was created recently to assist users like you!";
        }
        
        // Check for jokes
        if (this.containsWords(lowerMessage, ['joke', 'funny', 'laugh'])) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? He was outstanding in his field!",
                "Why don't eggs tell jokes? They'd crack each other up!",
                "What do you call a fake noodle? An impasta!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        // Default response
        return this.getRandomResponse('default');
    }
    
    containsWords(message, words) {
        return words.some(word => message.includes(word));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});