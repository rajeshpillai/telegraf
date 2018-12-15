var express = require('express'),
    app = express(),
    http = require('http').Server(app);
let port = 5000;
const io = require('socket.io')(http);

// TODO: Array of sockets/clients
let clients = [];

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/message', function (req, res) {
    console.log("POST: message");
    socketClient.on('message', {
        message: 'MSG: from console client...'
    });
    res.end();
});


http.listen(port, function () {
    console.log(`Socket server running on port ${port}`);
});

io.on('connection', function (socket) {
    console.log("A client connected...", socket.id);
    clients.push({
        id: socket.id
    });

    // Send a message to client -> Default 'message' event
    socket.send("Welcome to the Socket Server...");

    socket.on("data", (data) => {
        console.log("Client says : ", data);
        io.sockets.emit('message', data);
    })

    io.sockets.emit('on-client-connected', {
        message: `Total connections ${clients.length}`
    });

    // Emit an event to the opponent when the player leaves
    socket.on('disconnect', function () {
        console.log("A client disconnected...");
        clients = clients.filter((client) => {
            if (client.id !== socket.id) {
                return true;
            }
        });

        io.sockets.emit('on-client-disconnected', {
            message: `Total connections ${clients.length}`
        });
    });
});