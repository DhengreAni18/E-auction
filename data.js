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
    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var ul = document.getElementById("pro2");
      var li = document.createElement('li');
      
      
  }
  var link = '<a href="#" style="padding-right:40px;">Bid log</a>';
  
  li.innerHTML =  link;
  li.appendChild( document.createTextNode(name));
      ul.appendChild(li);

  
      
    // var bid = document.createTextNode(startbid);
    //    li.appendChild(bid);
        
      
      
});


    
      
     
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