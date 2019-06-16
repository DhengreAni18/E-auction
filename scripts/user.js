var myApp = {};
(function(){

  var addUserData = function() {
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        uidd = user.uid;

        var userData = firebase.database().ref('users/' + uidd);
    var proData = firebase.database().ref('Products');


    var id = document.getElementById('prodid');
    var bid = document.getElementById('bidd');
     
    var addUser = userData.push(
      {
        ProductID: prodid.value,
        Bid: bidd.value,
        
        
      }
    );

    

    
        // document.getElementById('userName').innerText = 'Welcome ' + name;
        console.log(name);
        console.log(uidd);
        
      } 
    });

    // console.log(uidd);
    
    // var UserField = 'users/uid';
    

   
  //  });
  

  // var ref = firebase.database().ref('Products');
// proData.orderByChild('name').equalTo(bidd.value).on("value", function(snapshot) {
//   snapshot.forEach((function(child) 
  
//     { 
//       console.log(child.key);
//       console.log('jnjn');
       
    
//     }
          
//           ) );
// });




  };
  
    
myApp.addUser = addUserData;


})();


