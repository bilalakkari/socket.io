const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

let _number = 0;

io.on('connection', (socket) => {
    _number++;
    console.log(_number);
    io.emit('userCountUpdate', _number);

    socket.on('disconnect', () => {
        _number--;
        console.log(_number);
        io.emit('userCountUpdate', _number);
    });

    socket.on('userCountRequest', () => {
        socket.emit('userCountUpdate', _number)
    })

});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});