var app ={};


   
(function(){

  
        const preObject = document.getElementById('pro2');

      var query = firebase.database().ref("Products").orderByKey();
query.on("child_added", function(snapshot) {
  
   var key = snapshot.key;
    var childData = snapshot.val();
    

console.log(key);
    var names = childData.name;
    var startbid = childData.startbid;
    var qua = childData.quantity;
    var id = childData.id;


    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var ul = document.getElementById("pro2");
      var li = document.createElement('li');
      var key = key;
  }

 
  li.appendChild( document.createTextNode(name));
  // li.append( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + qua));
  // li.appendChild( document.createTextNode(id));
  // $('li.list-group-item').append('<div>aaa</div>');


  li.className = 'list-group-item';
      ul.appendChild(li);
  

// moment(date+' '+time,'DD/MM/YYYY HH:mm').format('MM.DD.YYYY'); 
// var update = function() {
//   // document.getElementById("datetime")
//   li.appendChild = moment(remainTime,'HH:mm:ss').subtract(1, 'seconds').format(' HH:mm:ss ');
//   // console.log(ttime);

// }
// setInterval(update, 1000);

console.log(admin.database.ServerValue.TIMESTAMP);

      
            
});

var daata = firebase.database().ref("Products").orderByKey();
daata.on("child_added", function(snapshot) {
  
   var key = snapshot.key;
    var childData = snapshot.val();
    

console.log(key);
    var names = childData.name;
    var startbid = childData.startbid;
    var qua = childData.quantity;
    var RemTime = childData.rtime;


    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var rTime = RemTime;
      var ul = document.getElementById("time");
      var li = document.createElement('li');
      var key = key;
  }

 
  // li.append( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + qua));
  // li.appendChild( document.createTextNode(id));
  // $('li.list-group-item').append('<div>aaa</div>');


  li.className = 'list-group-item';
      ul.appendChild(li);
  

// moment(date+' '+time,'DD/MM/YYYY HH:mm').format('MM.DD.YYYY'); 
var update = function() {
  // document.getElementById("datetime")
  var b = document.createTextNode(rTime);
  // console.log(ttime);

}
var b = document.createTextNode(rTime);

setInterval(update, 1000);
li.appendChild(b);
      
            
});

// var query = firebase.database().ref("Products").orderByKey();
// query.on("child_changed", function(snapshot) {
  
// //    var key = snapshot.key;
//     var childData = snapshot.val();
    

//     for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
//       // var name = names;
//       // var startbid = startbid;
//       var ul = document.getElementById("time");
//       var li = document.createElement('li');
//       // var key = key;
//   }

 
//   // li.append( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + qua));
//   // li.appendChild( document.createTextNode(id));
//   // $('li.list-group-item').append('<div>aaa</div>');

//   var remainTime = childData.rtime;
//   var ttime = remainTime.slice(3 , 11);
//   li.className = 'list-group-item';
//       // ul.appendChild(li);
//       console.log(ttime);
      
//       li.appendChild( document.createTextNode(ttime));

// // console.log('change');
// // var update = function() {
// //   var remainTime = childData.rtime;
// // var ttime = remainTime.slice(3 , 11);
// // li.appendChild( document.createTextNode(ttime));

// //   // document.getElementById("datetime")    // console.log(ttime);
// //   // li.innerHTML= moment(ttime,'HH:mm:ss').subtract(1, 'seconds').format(' HH:mm:ss ');
// // // li.appendChild(ttime);

// // }


// // setInterval(update, 1000);

// // // // console.log(key);
// // //     var names = childData.name;
// // //     var startbid = childData.startbid;
// //     var desc = childData.rtime;
// // //     var qua = childData.quantity;
// // // console.log(desc);


// //     for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
// //       // var name = names;
// //       // var startbid = startbid;
// //       var ul = document.getElementById("pro2");
// //       var li = document.createElement('li');
// //       // var key = key;
// //   }

// //   var dateString = moment.unix(300000).format("HH:mm:ss");
// // console.log(dateString);

// //   // li.appendChild( document.createTextNode(desc));
// // //   li.remove( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + qua));
// // // var rrr = desc.subtract(5, 'seconds').format('HH:mm:ss');

// // // console.log(rrr);

// //   // li.className = 'list-group-item';
// //       // ul.appendChild(li);
  

// //       function print() {
// //       console.log(desc);
// //       setTimeout(print, 1000);

// //       }

      
            
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

    

    

    
    
}());