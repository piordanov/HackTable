//basic node server to check connection to/from clients

const express = require('express');
const { createServer } = require('http');
// const WebSocket = require('ws');

const app = express();
const server = createServer(app);
// const wss = new WebSocket.Server({ server });

// tell the server where our webpage files are
// app.use(express.static('public'));

// node sensehat led library
const sense = require("sense-hat-led").sync;

//default image to display on start
var X = [0, 255, 0];  // Green
var O = [255, 255, 255];  // White
var leds = [
O, O, O, O, O, O, O, O,
O, X, X, O, O, X, X, O,
O, X, X, O, O, X, X, O,
O, O, O, O, O, O, O, O,
O, X, O, O, O, O, X, O,
O, X, O, O, O, O, X, O,
O, X, X, X, X, X, X, O,
O, O, O, O, O, O, O, O
];

sense.setPixels(leds);

app.post('/payload', function (req, res) {
	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);
});

//set up the server, listening on port 8080
server.listen(8080, () => {
	console.log('Server listening on 8080');
});
