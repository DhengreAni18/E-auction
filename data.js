(function(){

        const preObject = document.getElementById('pro2');
        const dbRefObj = firebase.database().ref('Products/Samsung s10');
      

      dbRefObj.on('value', snap => {
        var daata = snap.val();
        preObject.innerText = daata.name;
      });
      
      
      // const FirebaseUser = FirebaseAuth.getInstance().getCurrentUser();
      // const userid = user.getUid();
    //   var database = firebase.database();

    //   let ref = database.ref('/Users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
    //     let userData = snapshot.val();
    //     console.log(userData.name);
    // })
      
    // console.log(firebase.auth().currentUser);
      var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        name = user.displayName;
        document.getElementById('userName').innerText = 'Welcome ' + name;
      } else {
        // No user is signed in.
      }
    });


//     var playersRef = firebase.database().ref("players/");

// playersRef.set ({
//    John: {
//       number: 1,
//       age: 30
//    },
	
//    Amanda: {
//       number: 2,
//       age: 20
//    }
// });

}());