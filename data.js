(function(){

      //   const preObject = document.getElementById('object');
      //   const dbRefObj = firebase.database().ref().child('object');
      

      // dbRefObj.on('value', snap => {
      //   preObject.innerText = JSON.stringify(snap.val());
      // });
      
      
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
        document.getElementById('username').innerText = name;
      } else {
        // No user is signed in.
      }
    });

}());