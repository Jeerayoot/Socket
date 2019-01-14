const WebSocket = require('ws');
const http = require('http');
var request = require('request');
//st Logging = require('@google-cloud/logging');
var server = http.createServer((function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end();
}));



const wss = new WebSocket.Server({ server });



wss.on('connection', function connection(ws, req) { //
    var ip = req.connection.remoteAddress;
    console.log('%s connected', ip);
    console.log(req.headers);
    //console.log('CONNECTED: %s : %s', ws., ws.remotePort);
    ws.on('message', function incoming(message) {
        console.log(message);
        const options = {
            url: 'https://fillup-api.azurewebsites.net/api/socket/' + message,
            method: 'POST'
        };

        request(options, function (error, response, body) {
            if (error) {
                return console.log('Error:', error);
            }

            if (response.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }

            console.log(body);
            ws.send(body);
        });
    });

    ws.on('error', function (error) {
        console.log('Error : %s', error);
    });

    ws.on('close', function close(req) {
        // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
        console.log('a user disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server start on port : 8080');
});