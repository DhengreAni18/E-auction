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
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

if (!hasFirebaseInit) {
    fireBaseConnection.initializeApp(fireBaseconfig);
    hasFirebaseInit = true;
}


// admin.initializeApp();


module.exports = {fireBaseConnection};
