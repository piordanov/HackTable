//basic node server to check connection to/from clients

const express = require('express');
const { createServer } = require('http');
// const WebSocket = require('ws');
// 
const server = createServer(function (req, res) {
	handler(req, res, function (err) {
		res.statusCode = 404;
		res.end('no such location')
	});
});
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

// sense.setPixels(leds);

function buildHeatMap() {
	// fetch commits, build heatmap like leds above
	sense.setPixels(leds);
}

const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/payload', secret: 'mysecret'});

//app.post('/payload', function (req, res) {
//	console.log(req.body);
//	
//	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);
//	buildHeatMap();
//});

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.pusher.name)
});

//set up the server, listening on port 8080
server.listen(8080, () => {
	console.log('Server listening on 8080');
	buildHeatMap();
});
