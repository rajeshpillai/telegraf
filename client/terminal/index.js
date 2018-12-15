var socketClient = require('socket.io-client')('http://localhost:5000');



socketClient.on('connect', function () {
    console.log("CONSOLE CLIENT: connected...");
});

socketClient.on('message', function (data) {
    console.log(data);
});




