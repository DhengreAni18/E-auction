var schedule = require('node-schedule');
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







cron.schedule(' * * * * * *', () => {
  var query = firebase.database().ref("Products").orderByKey();
query.on("child_added", function(snapshot) {
  
   var key = snapshot.key;
    var childData = snapshot.val();
    




    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      
     
      var startDate = childData.sdate;
      var startTime = childData.stime ;
      var endDate = childData.edate;
      var endTime = childData.etime ;
  
      
      // console.log(startDate);
      
      
      var ts = moment( startDate, "YYYY/MM/DD H:mm").unix();
      var ts1 = moment(endDate , "YYYY/MM/DD H:mm").unix();
      var eventTime= ts1; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
      var currentTime = ts; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
      var diffTime = eventTime - currentTime;
      var duration = moment.duration(diffTime*1000, 'milliseconds');
      var interval = 1000;
      var CurrDate = moment().format('YYYY-MM-DD');
      // var CurrTime = moment().local().format('HH:mm:ss');

    
    
    


  

      setInterval(function(){
        

       
        
        
        duration = moment.duration(duration - interval, 'milliseconds');
         
                  var usersRef = firebase.database().ref('Products');
                  var remainT =  duration.hours()+':'+duration.minutes() + ':' + duration.seconds();
                  
                  

                  usersRef.on('child_added', function(snapshot) {
                    var id = snapshot.key;
                    var childData = snapshot.val();

                    
    
                      var hopperRef = usersRef.child(id);
                        hopperRef.update({
                          "rtime": remainT
                        });
                      
                  });
                  
                 
                  
               

        }, interval);
      

            
                
      
      
  }



 
      

  


            
});
});




