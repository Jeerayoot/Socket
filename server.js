const net = require('net');
const colors = require('colors');
const request = require('request');
const port = process.env.port || 80;
const host = '0.0.0.0';

const server = net.createServer();

let sockets = [];

server.on('connection', function (socket) {

    console.log('CONNECTED: %s : %s'.green, socket.remoteAddress, socket.remotePort);
    sockets.push(socket);

    socket.on('data', function (data) {
        console.log('DATA FROM %s : %s'.cyan, socket.remoteAddress, data);
        /*const options = {
            url: 'https://fillup.stpi.co.th/api/socket/' + data,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'my-reddit-client'
            }
        };

        request(options, function (err, res, body) {
            let json = JSON.stringify(body);
            socket.write(JSON.parse(json));
        });*/

        socket.write('002460100190090810001C000002000000100022080218083030');

    });

    socket.on('error', function (err) {
        console.log('ERROR : %s'.red, err);
    });

    socket.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        });
        if (index !== -1) {
            sockets.splice(index, 1);
            console.log('%s : %s : DISCONNECTED!'.yellow, socket.remoteAddress, socket.remotePort);
            //console.log(sockets.length);
        }
    });
});


server.listen(port, host, () => {
    console.log('TCP Server is running on port : %s'.green, port);
});