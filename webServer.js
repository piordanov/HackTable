//basic node server to check connection to/from clients

const express = require('express');
const { createServer } = require('http');
// const WebSocket = require('ws');
// node sensehat led library
const sense = require("sense-hat-led").sync;
const axios = require("axios");
const { DateTime } = require("luxon");

const server = createServer(function (req, res) {
	handler(req, res, function (err) {
		res.statusCode = 404;
		res.end('no such location')
	});
	
});

//default image to display on start
var X = [0, 255, 0];  // Green
var O = [0 , 0, 0];  // Black
const cleanLeds = [
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O
];

async function buildHeatMap() {
	// fetch commits, build heatmap like leds above
	const response = await axios.get('https://api.github.com/repos/piordanov/HackTable/commits');
	let commits = response.data;
	let leds = cleanLeds.slice();
	
	let commit_times = commits.map(c => DateTime.fromISO(c.commit.author.date));
	let firstTime = commit_times[0];
	for (let idx = 1; idx < commit_times.length; idx++) {
		let curr = commit_times[idx];
		let duration = firstTime.diff(curr, ["hours"])
		let index = Math.round(duration.hours);
		if (index < 64) {
			leds[index] = X;
		}
	}
	console.log(leds);
	sense.setPixels(leds);

}

const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/payload', secret: 'myhashsecret'});

handler.on('push', function (event) {
  	console.log('Received a push event for %s by %s', 
		event.payload.repository.name,
		event.payload.pusher.name);
	buildHeatMap();
});

//set up the server, listening on port 8080
server.listen(8080, () => {
	console.log('Server listening on 8080');
	buildHeatMap();
});
