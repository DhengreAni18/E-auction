// import moment = require("moment");
var timer = require('./timer.js');

var app ={};

(function(){

        const preObject = document.getElementById('pro2');

//       var query = firebase.database().ref("Products").orderByKey();
// query.on("child_added", function(snapshot) {
  
//    var key = snapshot.key;
//     var childData = snapshot.val();
    
// var objlength = Object.keys(firebase.database().ref("Products"));
// // console.log(key);
//     var names = childData.name;
//     var startbid = childData.startbid;
//     var desc = childData.description;
//     var qua = childData.quantity;

//     console.log(objlength);
    
    

//     for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
//       var name = names;
//       var startbid = startbid;
//       var ul = document.getElementById("pro2");
//       var li = document.createElement('li');
//       // li.appendChild( document.createTextNode(i));

//       // li.id = i;
//     // console.log([i]);

    

//   }

//   li.innerHTML = '<button style="float:right;">sd</button>';

//   li.appendChild( document.createTextNode(name));
//   // li.appendChild( document.createTextNode(i));

//   li.id

//   // li.appendChild( document.createTextNode(startbid));


//   li.className = 'list-group-item';
//       ul.appendChild(li);


      
            
// });



var fragment = document.createDocumentFragment();
var table = document.createElement("table");
table.id = 'proTable';
var query = firebase.database().ref("Products");

query.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {

    var tr = document.createElement("tr");
    var value = childSnapshot.val();
    var key = childSnapshot.key;

    var trValues = [timer.remainT,value.name,value.startbid,value.currbid];
    // console.log(firebase.database.ServerValue.TIMESTAMP  );
    
    
   

    for (var i = 0; i < trValues.length; i++) {
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var space = document.createElement("td");

      // space.innerHTML = '<div> </div>';
      // var th = document.createElement("th");      // TABLE HEADER.
      // th.innerHTML = trValues[i];
      td2.innerHTML =  '<input placeholder="Bid amount" style="width:120px; , padding-left:50px;" id="ex2" type="text">'+'&nbsp;' +'&nbsp;' +'&nbsp;' +'&nbsp;' +'&nbsp;' + '<button class="btn-primary"  id="placebidd">' +  'Place Bid' + '</button>' ;
      td1.innerHTML =  trValues[i] ;
      tr.appendChild(td1);
      // console.log(this.find( 1).text());
    }
// onclick="alert(this.parentNode.parentNode.rowIndex)"

    tr.appendChild(td2);
    $(' table td:nth-child(2)').addClass('proname');

    table.appendChild(tr);
    table.className = 'table table-striped';
  
    $(".btn-primary").on('click' , (function() {
      var $row = $(this).closest("tr");    // Find the row
      var $text = $row.find("#ex2").val(); // Find the text
      var $name = $row.find(".proname").text(); // Find the product name

      // Let's test it out
      // alert($text);
      // alert($name);
alert($row)      ;

      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log($text);
        console.log(value.startbid);
        
        
        if($text < value.startbid) {
      alert('Enter Bid Greater than startBid')
        }

        else {
        name = user.displayName;
        uidd = user.uid;

        var userData = firebase.database().ref('users/' + uidd+ '/' +$name );
    var proData = firebase.database().ref('Products');

          var currentDateandTime = moment().format('YYYY MM DD , hh:mm:ss');
    // var id = document.getElementById('prodid');
    // var bid = document.getElementById('bidd');
     
    var addUser = userData.update(
      {
        BidTime: currentDateandTime,
        Bid: $text,
      }
    );

        console.log(name);
        console.log(uidd);
        }
      } 
    });
      
  }))
    
       
  });
});


fragment.appendChild(table);
document.getElementById('tablee').appendChild(fragment);


      
      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        document.getElementById('userName').innerText = 'Welcome ' + name;
        console.log(user.uid);
      } else {
        
      }
    });

    
}());