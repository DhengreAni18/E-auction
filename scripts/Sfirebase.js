var firebase = require('firebase');
// var admin = require('firebase-admin');
var firebaseAuth = require("firebase/auth");
var admin = require('firebase-admin');
// var serviceAccount = require("C:/Users/Animesh/Downloads/eauctionservicekey.json");
// var app = admin.initializeApp();
// defaultAuth = admin.auth();
// defaultDatabase = admin.database();


var fireBaseConnection = firebase || fireBaseConnection;
var hasFirebaseInit = false;

var fireBaseconfig = {
    apiKey: "AIzaSyARxbH90BpomE-1nG42-x5HzZMQOr4yVaU",
    authDomain: "eauction-36b35.firebaseapp.com",
    databaseURL: "https://eauction-36b35.firebaseio.com",
    projectId: "eauction-36b35",
    storageBucket: "eauction-36b35.appspot.com",
    messagingSenderId: "151716692380",
    appId: "1:151716692380:web:77f840f0a99ffefd"
};

if (!hasFirebaseInit) {
    fireBaseConnection.initializeApp(fireBaseconfig);
    hasFirebaseInit = true;
}


// admin.initializeApp();


module.exports = {fireBaseConnection};
