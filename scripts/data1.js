var app ={};

(function(){

        const preObject = document.getElementById('pro2');

      var query = firebase.database().ref("Products").orderByKey();
query.on("child_added", function(snapshot) {
  
   var key = snapshot.key;
    var childData = snapshot.val();
    
var objlength = Object.keys(firebase.database().ref("Products"));
// console.log(key);
    var names = childData.name;
    var startbid = childData.startbid;
    var desc = childData.description;
    var qua = childData.quantity;

    console.log(objlength);
    
    

    for (var i = 0; i <Object.keys(firebase.database().ref("Products")).length; i++) {
      var name = names;
      var startbid = startbid;
      var ul = document.getElementById("pro2");
      var li = document.createElement('li');
      // li.appendChild( document.createTextNode(i));

      // li.id = i;
    // console.log([i]);

    

  }

  li.innerHTML = '<button style="float:right;">sd</button>';

  li.appendChild( document.createTextNode(name));
  // li.appendChild( document.createTextNode(i));

  li.id

  // li.appendChild( document.createTextNode(startbid));


  li.className = 'list-group-item';
      ul.appendChild(li);


      
            
});

      
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