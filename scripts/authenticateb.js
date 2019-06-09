var mainApp = {};
(function(){

var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("loginb.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("stay");
          mainContainer.style.display = "";
        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("loginb.html");
        }
      });
}
    
init();


// var add_data = function() {
//   var proref = firebase.database().ref('Products');
//   var proref = firebase.database().ref('Users');

//   var quantity = document.getElementById('quan');
 
//   var productName = document.getElementById('naam');
//   var pro_desc = document.getElementById('deescription');
//   var start_Bid = document.getElementById('sttartbid');
//   var addpro = proref.push(
//     {
//       currBid : 
//     }

    
  
//   );
//     console.log(productName.value);
//     console.log(pro_desc);
//     console.log(start_Bid);

//   };


mainApp.logout = logtout;


})();


