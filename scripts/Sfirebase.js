var firebase = require('firebase');
const admin = require('firebase-admin');

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

module.exports = {fireBaseConnection};