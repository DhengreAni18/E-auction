var app ={};

(function(){

        const preObject = document.getElementById('pro2');

      var query = firebase.database().ref("Products").orderByKey();
query.on("child_added", function(snapshot) {
  
   var key = snapshot.key;
    var childData = snapshot.val();
    

// console.log(key);
    var names = childData.name;
    var startbid = childData.startbid;
    var desc = childData.description;
    var qua = childData.quantity;


    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var ul = document.getElementById("pro2");
      var li = document.createElement('li');
      // var body = document.getElementById("bodyy");
      var p = document.createElement('p');
      var pp = document.createElement('p');

  }



 
    li.innerHTML =   '  <button type="button" class="btn btn-outline-primary" onclick="myFunction1()" style="float:right;">Bid</button>  ' + '<input type="text" placeholder="Place a bid" id="currbid" style = "float:right; margin-right:20px;" />'  ;
      

  li.appendChild( document.createTextNode(name));
  li.append( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + qua));
  
  p.appendChild( document.createTextNode(desc));

  p.id = "parar";
  li.className = 'list-group-item';
// p.appendChild(document.createTextNode(txtt));
      ul.appendChild(li);
      ul.appendChild(p);

      // body.appendChild(p);

      var query = firebase.database().ref("Time").orderByKey();
      query.on("value", function(snapshot) {
        
         var key = snapshot.key;
          var childData = snapshot.val();
          

                
          var startDate = childData.sdate;
          var startTime = childData.stime ;
          var endDate = childData.edate;
          var endTime = childData.etime ;
      
          
          console.log(startDate);
          
          var ts = moment( startDate + startTime, "YYYY/MM/DD H:mm").unix();
          var ts1 = moment(endDate + endTime, "YYYY/MM/DD H:mm").unix();
          var eventTime= ts1; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
          var currentTime = ts; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
          var diffTime = eventTime - currentTime;
          var duration = moment.duration(diffTime*1000, 'milliseconds');
          var interval = 1000;
          var CurrDate = moment().format('YYYY-MM-DD');
          // var CurrTime = moment().local().format('HH:mm:ss');

        
        
        var currtime;
        (currtime = function() {
             moment().format(' h:mm:ss');
        })();
        setInterval(currtime, 1000);


      //   for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      //     var startDate =SDate;
      //     var startTime =STime ;
      //     var endDate = EDate;
      //     var endTime =ETime ;
      // }

          setInterval(function(){
            if(duration == 0) {
              console.log('aa');
              
            return;
            }

            // else if (CurrDate !== startDate) {
            //   console.log('bb');
              
            //   return;
              
            // }


            // else if(currtime >= endTime) {
            //     console.log(currtime);
            //     document.getElementById('zz').innerText = 'Over';
            // return;
            // }
            
            else {
            duration = moment.duration(duration - interval, 'milliseconds');
              $('.countdown').text("Time Remaining : "+duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
              // console.log( duration.hours()+':'+duration.minutes() + ':' + duration.seconds());
              
                      // var proref = firebase.database().ref('Products');
                      var remainT =  duration.hours()+':'+duration.minutes() + ':' + duration.seconds();
                      // console.log(remainT);
                      // console.log(currtime);
                      // console.log(endTime);
                      

                      // usersRef.on('child_added', function(snapshot) {
                      //   var id = snapshot.key;
                      //   var childData = snapshot.val();

                      //   var RTime = childData.rtime;
                      //     // console.log(id);
                          
                            
                      //         var aa = moment(RTime).subtract(1, 'seconds').format('h:mm:ss');
                      //       //  console.log(aa);
                      //       //  console.log(RTime);
                             
                             
                            
                          

                      //     var hopperRef = usersRef.child(id);
                      //       hopperRef.update({
                      //         "rtime": remainT
                      //       });
                          
                      // });

                     
                      
                   

            }}, interval);});

            
                

            
});

        


// var que = firebase.database().ref("Users").orderByKey();
// que.on("child_changed")
//   .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var key = childSnapshot.key; // "ada"
//       var body = document.getElementById('bodyy');
//       body.innerText = key;
//       // Cancel enumeration
//       return true;
//       // console.log(key);
      
//   });
// });


    
      
     
      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        document.getElementById('userName').innerText = 'Welcome ' + name;
        console.log(name);
      } else {
        // No user is signed in.
      }
    });

    

    

    // var proref = firebase.database().ref('Products');
    
    // var addpro = proref.push(
    //   {
    //     name: document.getElementById('naame'),
    //     description: document.getElementById('deescription'),
    //     startbid: document.getElementById('sttartbid')
        
    //   }
    // );
    
    // var removePro = 'macbook pro';
    //   proref.orderByChild('name').equalTo(removePro)
    //       .once('value').then(function(snapshot) {
    //           snapshot.forEach(function(childSnapshot) {
    //           //remove each child
    //           proref.child(childSnapshot.key).remove();
    //       });
    //   });

      

    
}());