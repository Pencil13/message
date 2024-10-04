import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCxxa7HUSf4HsRoTl5t72kPQ9MCfDC3rKw",
    authDomain: "message-30f97.firebaseapp.com",
    projectId: "message-30f97",
    storageBucket: "message-30f97.appspot.com",
    messagingSenderId: "602360945743",
    appId: "1:602360945743:web:56190dec3985e6ec455e3a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Function to send a message to Firebase
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    console.log('Sending message:', messageText);  // Debugging the message

    if (messageText !== '') {
        // Push the message to the Firebase database under "messages" node
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            text: messageText,
            sent: true
        }).then(() => {
            console.log('Message sent successfully!');
            messageInput.value = '';  // Clear the input field after sending
        }).catch((error) => {
            console.error('Error sending message:', error);  // Log any errors that occur
        });
    } else {
        console.log('Message input is empty');  // If the input is empty, log it
    }
}

// Event listener for the send button click
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Event listener for the "Enter" key on the message input field
document.getElementById('messageInput').addEventListener('keydown', function (e) {
    console.log('Key pressed:', e.key);  // Debugging the key press

    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();  // Prevent default action of the Enter key (like submitting a form)
        console.log('Enter key pressed, sending message...');  // Debugging when Enter is pressed

        sendMessage();  // Call the sendMessage function
    }
});
