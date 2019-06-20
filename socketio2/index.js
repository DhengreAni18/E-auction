// var fireBase = require('./Sfirebase');
var SERVER_PORT = 12251;
// var moment = require("moment");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('transports', ['websocket']);

server.listen(SERVER_PORT);

console.log("Server Running");



io.on('connect', (socket) => {
        console.log("Client Connected");


        socket.on('getUsers', (data) => {

                        console.log(data);
                          

                                socket.emit('UsersData',data);

                        
                });
});