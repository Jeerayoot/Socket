const net = require('net');
const server = net.createServer(function (socket) {
    socket.write('Echo from server: NODE.JS Server \r\n');
    socket.pipe(socket);
    socket.end();
});

server.on('connection',function(socket){
    
});

server.listen(8080, function () {
    console.log('Server startt on port : 8080');
});