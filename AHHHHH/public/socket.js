// File: public/socket.js

const socket = io();

document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    // Get the username from the query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username') || 'DefaultUsername';

    // Emit the message and username to the server
    socket.emit('chat message', { username, message });

    messageInput.value = '';
});

socket.on('chat message', (data) => {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');

    // Display the username and message
    messageElement.textContent = `${data.username}: ${data.message}`;

    // Append the message to the chat container
    chatContainer.appendChild(messageElement);
});
