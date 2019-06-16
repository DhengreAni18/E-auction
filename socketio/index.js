var firebase = require('./firebase');
// const firebaseApp = firebase.initializeApp(fbconfig);

var SERVER_PORT = 12251;
var moment = require("moment");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const FirebaseAuth = require('firebaseauth'); // or import FirebaseAuth from 'firebaseauth';
var auth = require("firebase/auth");




io.set('transports', ['websocket']);

server.listen(SERVER_PORT);

console.log("Server Running");



io.on('connect', (socket) => {
        console.log("Client Connected")


        socket.on('getAuctions', (data) => {

                        var usersRef = firebase.firebaseConnection.database().ref('Products').orderByChild("edate");
                
                        var data = {};
                        data.time_stamp = moment().unix();
                        data.auctions = [];
                
                        var i = 0;
                
                        usersRef.on("child_added", function (snapshot) {
                
                                var adata = snapshot.val();
                
                                for (i in adata) {
                                        data.auctions.push(adata[i]);
                                }

                                console.log(data);

                                socket.emit('auctionData',data);

                        });
                });


        // socket.on('userData' , (userDetails) => {

        //         console.log(userDetails.aa);
        //         console.log(userDetails.bb);

        //         // console.log('got userd');
        //  //        console.log(userData);
        // // firebase.auth().createUserWithEmailAndPassword(userDetails.aa, userDetails.bb).catch(function(error) {
        // //         // Handle Errors here.
        // //         var errorCode = error.code;
        // //         var errorMessage = error.message;
        // //         window.alert("Error : " + errorMessage);
        // //         // ...
        // //       });

        //       firebase.auth().signInWithEmailAndPassword(userDetails.aa, userDetails.bb).catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;

        //         window.alert("Error : " + errorMessage);

        //         window.location.replace('index.html');

        //         // ...
        //       });
        //         socket.emit('userData',userDetails);


        // })        
});