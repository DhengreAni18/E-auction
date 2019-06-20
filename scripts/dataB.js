// import moment = require("moment");
// var timer = require('./timer');
// const timer = require('./timer1');
var maApp = {};

(function(){

      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        uiddd = user.uid;
       

      } else {
        
      }
    });

}());

 



// aaa(1);