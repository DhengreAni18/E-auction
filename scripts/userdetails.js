


  var mainApp = {};
(function(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          name = user.displayName;
          uid = user.uid;
        } else {
         
        }
      });
})();


