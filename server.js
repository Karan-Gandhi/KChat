const express = require('express');
const app = express();
const User = require("./user.js");
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server started at http://localhost:${potr}/`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/getFirebaseData', (request, response) => {
    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    };
    
    response.json(config);
});

const io = require('socket.io') (server);
users = [];

io.sockets.on('connection', (socket) => {
    console.log("We have a new client: " + socket.id);

    socket.on('start', (data) => {
        // console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        const user = new User(data.uid, data.name, data.uname, data.password, socket.id);
        users.push(user);
        console.log(users);
        io.sockets.emit('join', data.name);
    });

    socket.on('sendMessage', (message) => {
        io.sockets.emit('getMessage', message);
        console.log(message);
        users.forEach(user => {
            if (user.cid === socket.id) {
                user.gotMessage(message);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(`Client : ${socket.id} has disconnected`);
        for (var i = 0; i < users.length; i++) {
            if (users[i].cid === socket.id) {
                users.splice(i);
            }
        }
    });
});

// app.use(function(req, res, next) {
//     res.status(404).sendfile('public/404.html');
// });