# HackTable

This server acts a proof of concept of displaying a commit heat map that updates while teams work on their projects.

## Setup

Clone the project onto a raspberry pi with a SenseHat (follow instructions for setup found in the [Hacking the Hack Guide](https://github.com/augustluhrs/HackTheHack_RaspiGuide).

Run `npm install` to setup the webserver. 

`sudo node webServer.js` to start the server.

Also, will need to set up a localtunnel for the webhook to get a payload URL, this [guide](https://thisdavej.com/make-your-raspberry-pi-web-server-available-on-the-internet-with-node-js/) can assist.

To setup a Github webhook, see the example below. Currently this is connected to this project's webhook, but that can be changed to any project. Be sure to set a hash secret (and specify it in the github-webhook-handler, as it will not connect without one.


![image](https://user-images.githubusercontent.com/5401480/138612915-212bffc3-67cb-4cf3-a2ce-dc3c87538af4.png)

With this server running, any pushes to the specified repo will update the heat map on the raspberry pi.

