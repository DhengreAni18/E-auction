var http = require('http');
var cron = require('node-cron');
 var moment = require("moment")
var firebase = require('firebase');
var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
     apiKey: "AIzaSyARxbH90BpomE-1nG42-x5HzZMQOr4yVaU",
    authDomain: "eauction-36b35.firebaseapp.com",
    databaseURL: "https://eauction-36b35.firebaseio.com",
    projectId: "eauction-36b35",
    storageBucket: "eauction-36b35.appspot.com",
    messagingSenderId: "151716692380",
    appId: "1:151716692380:web:77f840f0a99ffefd"
  };
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}

var usersRef = firebase.database().ref('Products');

cron.schedule('*/0,5 * * * * *', function () {

    var query = firebase.database().ref("Products").orderByKey();
    
    query.on('value',function(snap) {
        
        snap.forEach(function(item) {
        
           var current_item = item.val();

            var startDate = current_item.sdate;
            var endDate = current_item.edate;

            var start_ts = moment( moment(), "YYYY/MM/DD H:mm:ss");
            var end_ts = moment(endDate , "YYYY/MM/DD H:mm:ss");

            var duration = moment.duration(end_ts.diff(start_ts));

            var remainT = moment.utc(duration.as('milliseconds')).format("DD:HH:mm:ss")

            var hopperRef = usersRef.child(item.key);
            hopperRef.update({
              "rtime": remainT
            });

        });

     });
});