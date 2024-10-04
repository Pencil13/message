function loadMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = ''; 
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.sent ? 'sent' : 'received');
        messageDiv.textContent = msg.text;
        messagesContainer.appendChild(messageDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ text: messageText, sent: true });
        localStorage.setItem('messages', JSON.stringify(messages));
        messageInput.value = ''; 
        loadMessages();
    }
}

function deleteChat() {
    localStorage.removeItem('messages'); 
    loadMessages(); 
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Event listener for the Enter/Return key
document.getElementById('messageInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Event listener for the delete chat button
document.getElementById('deleteChatButton').addEventListener('click', deleteChat);

// Load messages on page load
loadMessages();
