var fireBase = require('./Sfirebase');
var SERVER_PORT = 9090;
var moment = require("moment");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('transports', ['websocket']);

server.listen(SERVER_PORT);

console.log("on port" + SERVER_PORT);
console.log("Server Running");

io.on('connect', (socket) => {
        console.log("Client Connected");

        socket.on('getAuctions', (data) => {
                        var usersRef = fireBase.fireBaseConnection.database().ref('Products').orderByChild("edate");
                
                        var data = {};
                        data.time_stamp = moment().unix();
                        data.auctions = [];
                
                        var i = 0;
                
                        usersRef.on("value", function (snapshot) {
                
                                var adata = snapshot.val();
                
                                for (i in adata) {
                                        data.auctions.push(adata[i]);
                                }

                                console.log(data);
         
                                socket.emit('auctionData',data);

                        });
                })

        socket.on('postBid' ,(bidData) => {

                 var ProData = fireBase.fireBaseConnection.database().ref('Products').orderByChild('pcode').equalTo(bidData.product_code);                            

                        var currentDateandTime = moment().unix();
               
                        var addUser = fireBase.fireBaseConnection.database().ref('ProductCode/' + bidData.product_code ).push (
                            {
                            BidTime: currentDateandTime,
                            Bid: bidData.Bid_amt,
                            userid: bidData.token,
                            username:bidData.name
                            }
                        );
                   

                ProData.on("value", function(snapshot) {
                    snapshot.forEach((function(data) {
                        
                        var PushData = fireBase.fireBaseConnection.database().ref('Products/' + data.key ).update({
                            currbid:bidData.Bid_amt
                        })

                    }));
                });
        }) 

        socket.on('bidlog', (logdata) => {

                var bidRef = fireBase.fireBaseConnection.database().ref('ProductCode/' + logdata.product_code ).orderByChild('username').equalTo(logdata.name);
        
                var logdata = {};
                logdata.logs = [];
        
                        bidRef.once("value", function(snapshot) {
                                snapshot.forEach((function(data) {

                                 var loggsdata = data.val();
                                 var i = 0;

                                 for (i in loggsdata) {
                                        logdata.logs.push(loggsdata);
                                }

                                console.log(logdata);
                                
                                 socket.emit('postlogdata' , logdata)
                                                                         
                                }));
                        });

        })
        });
