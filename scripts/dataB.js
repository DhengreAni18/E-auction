// import moment = require("moment");
// var timer = require('./timer');
// const timer = require('./timer1');
var maApp = {};

(function(){

        const preObject = document.getElementById('pro2');
// console.log(timer.remainTime);

var fragment = document.createDocumentFragment();
var table = document.createElement("table");
table.id = 'proTable';
var query = firebase.database().ref("Products");

query.once("value").then(function(snapshot) {
  var i =0;
  snapshot.forEach(function(childSnapshot) {

     tr = document.createElement("tr");
     value = childSnapshot.val();
    var key = childSnapshot.key;

    //  trValues = [ value.name,value.startbid,value.currbid];
    // console.log(firebase.database.ServerValue.TIMESTAMP  );
    
       html1 = value.name ;
     var html2 = value.startbid;
     var html3 = value.currbid;

   

    
       td1 = document.createElement("td");
       td2 = document.createElement("td");
       td3 = document.createElement("td");
       space = document.createElement("td");
      // space.innerHTML = '<div> </div>';
      // var th = document.createElement("th");      // TABLE HEADER.
      // th.innerHTML = trValues[i];

      td1.innerHTML =  html1;
      space.innerHTML =  html2;
      td3.innerHTML =  html3;


      tr.appendChild(td1);
      tr.appendChild(space);
      tr.appendChild(td3);

      var html = '<input placeholder="Bid amount" id="bidamt_' + i + '" style="width:120px; , padding-left:50px;"  type="text">' ;
            html +=  '<span>' + '<button class="btn-primary"  id="bidbtn_' + i + '" onclick="maApp.addBid(' +i +');" >' +  'Place Bid' + '</button>'+ '</span>'
          html+='<input type="hidden" id="pcode_' + i + '" value="' + value.pcode + '" />'
            // alert(html);
      
        btnnnID = " bidbtn_' + i + ' "
        
        td2.innerHTML = html;
        space.innerHTML = html2;
        td3.innerHTML = html3;

        // console.log(this.find( 1).text());
    
// onclick="alert(this.parentNode.parentNode.rowIndex)"

    tr.appendChild(td2);
    // $(' table td:nth-last-child(1)').addClass('proname');

    table.appendChild(tr);
    table.className = 'table table-striped';

    $(' table tr td:nth-child(1)').addClass('proname');

   
    i++;
    
       
  });



});


fragment.appendChild(table);
document.getElementById('tablee').appendChild(fragment);




      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        uiddd = user.uid;
        document.getElementById('userName').innerText = 'Welcome ' + name;
        console.log(user.uid);

        var queery = firebase.database().ref("users/" + uiddd );
console.log(uiddd);

queery.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {

    value = childSnapshot.val();
    var key = childSnapshot.key;

    

     
     var  htmls = '<ul>';
            // html += '<tr> <th>Month</th> <th>Savings</th> <th>Savings</th> <th>Savings</th> <th>Savings</th></tr>'
            htmls +=  '<li>'+ value.proName  +'-----------------'  + value.Bid+'</li>';
            // htmls += '<td>'+ +'</td>';
            htmls += '</ul>';

           $('.modal-body').append(htmls) 

      
          
})});
      } else {
        
      }
    });



   var submitBid =  function aaa(i) {
      var bidAmount = $('#bidamt_' + i).val();
      var Pcode = $('#pcode_' + i).val();

      // alert(Pcode);


      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(bidAmount);
        console.log(value.startbid);
        
        
      //   if($text < value.startbid) {
          
      // window.alert('Enter Bid Greater than startBid')
      //   }
    
        
        name = user.displayName;
        uidd = user.uid;
    
        var userData = firebase.database().ref('users/' + uidd+ '/'   );
    
          var currentDateandTime = moment().format('YYYY MM DD , hh:mm:ss');
    // var id = document.getElementById('prodid');
    // var bid = document.getElementById('bidd');
     alert('Placed Bid Successfully');
    //  alert(Pcode);
    //  alert(currentDateandTime);
    var addUser = userData.update(
      {
        BidTime: currentDateandTime,
        Bid: bidAmount,
        Pcode: Pcode
      }
    );
    
    
    
    
    // location.reload();
        console.log(name);
        console.log(uidd);
        
      } 
    });
    
    }
    
   
    maApp.addBid = submitBid;

}());

 



// aaa(1);