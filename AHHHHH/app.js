// File: app.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/chat', (req, res) => {
    // Extract the username from the request body
    const username = req.body.username || 'DefaultUsername';

    // Send the username as a query parameter to the chat page
    res.redirect(`/chat.html?username=${encodeURIComponent(username)}`);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        // Broadcast the message and username to all connected clients
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
