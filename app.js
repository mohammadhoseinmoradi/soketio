var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data);
        console.log("===============================================================================")
    });
});
io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data);

        client.emit('messages', 'Hello from server');
        console.log('---------------------------------------------------------------------------------')
    });
});
io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data);
        client.on('messages', function(data) {
            client.emit('broad', data);
            client.broadcast.emit('broad', data);
        });
    });
    console.log("'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''")
})
server.listen(4200);