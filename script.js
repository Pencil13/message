import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCxxa7HUSf4HsRoTl5t72kPQ9MCfDC3rKw",
    authDomain: "message-30f97.firebaseapp.com",
    projectId: "message-30f97",
    storageBucket: "message-30f97.appspot.com",
    messagingSenderId: "602360945743",
    appId: "1:602360945743:web:56190dec3985e6ec455e3a"
  };

  const app = initializeApp(firebaseConfig);
  const database = firebase.database();

  function loadMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = ''; // Clear current messages

    // Listen for new messages added to Firebase
    const messagesRef = database.ref('messages');
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        messagesContainer.innerHTML = ''; // Clear messages before adding updated ones

        for (let id in messages) {
            const msg = messages[id];
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', msg.sent ? 'sent' : 'received');
            messageDiv.textContent = msg.text;
            messagesContainer.appendChild(messageDiv);
        }

        // Scroll to the bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    console.log('Sending message:', messageText); // Debug

    if (messageText !== '') {
        // Push the message to Firebase database
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            text: messageText,
            sent: true
        }).then(() => {
            console.log('Message sent successfully!');
            messageInput.value = ''; // Clear input field after sending
        }).catch((error) => {
            console.error('Error sending message:', error); // Debug error
        });
    } else {
        console.log('No message text entered.'); // Debug empty input
    }
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Event listener for the "Enter" key on the message input field
document.getElementById('messageInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendMessage();
    }
});
