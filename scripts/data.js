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
    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var ul = document.getElementById("pro2");
      var li = document.createElement('li');
      // var body = document.getElementById("bodyy");
      var p = document.createElement('p');
  }
 
 
  var bidlog = li.innerHTML =  '  <button type="button" class="btn btn-outline-primary" onclick="myFunction1()" style="float:right;">Details</button>  ' ;
 
  li.appendChild( document.createTextNode(name));
  li.append( document.createTextNode( ' ' + ' ' +' ' +' -'+' ' + startbid));
  p.appendChild( document.createTextNode(desc));
  p.id = "parar";
  li.className = 'list-group-item';
// p.appendChild(document.createTextNode(txtt));
      ul.appendChild(li);
      ul.appendChild(p);

      // body.appendChild(p);
 
      
      
});

        

// var que = firebase.database().ref("Products").orderByKey();
// que.once("value")
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