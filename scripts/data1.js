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

    var trValues = [key,value.name,value.startbid,value.currbid];

    

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
// $('#placebidd').on('c')
// alert( $(this).find('td:first').text());
    tr.appendChild(td2);
    // console.log(document.getElementById("proTable").rows.value);
    $(' table td:nth-child(2)').addClass('proname');

    table.appendChild(tr);
    table.className = 'table table-striped';
  

    $(".btn-primary").on('click' , (function() {
      var $row = $(this).closest("tr");    // Find the row
      var $text = $row.find("#ex2").val(); // Find the text
      var $name = $row.find(".proname").text(); // Find the text

      // Let's test it out
      alert($text);
      alert($name);
  }))
    // placebidd.onclick = getId(this);
    
//     $('#proTable').on('click', 'tr', function() {
//       //  console.log( $(this).find('td:first').text());
        
// // console.log(key);

//        var usersRef = firebase.database().ref('Products');

//        var query = firebase.database().ref("Products").orderByChild('key').equalTo($(this).find('td:first').text());
    
//     query.on('value',function(snap) {
//       console.log(key);
//       console.log($(this).find('td:first').text());
      
//         snap.forEach(function(item) {
//         console.log(key);
        
//            var current_item = item.val();

//             console.log(current_item);
            
            
//             // var hopperRef = usersRef.child(item.key);
//             // hopperRef.update({
//             //   "rtime": remainT
//             // });

//         });

//      });
//   });
  });

  // $('#placebidd').on('click', function () {                
  
  //   var tbl = document.getElementById(proTable);
  //   // alert($(this).closest('tr')[0].sectionRowIndex);
  //   // console.log();
    
  //   alert($(this).closest('tr').find('#ex2').val());
  
  //   // var rCount = tbl.parentNode.parentNode.rows.length;
   
  // });
});


// var table = document.getElementById("proTable");
 
//       for (var i = 0 ; i < table.rows.length; i++) {

//           var row = "";

//           for (var j = 0; j < table.rows[i].cells.length; j++) {

//               row += table.rows[i].cells[j].innerHTML;
//               row += " | ";
//           }

//           alert(row);
//       }

// function  getId(element) {
//   // console.log("row" + element.parentNode.rowIndex );
//   console.log('aaa');
  
  
// }

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