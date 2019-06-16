var mainApp = {};
(function(){

var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
      console.log('aa');
      
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("../index.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          name = user.displayName;
          document.getElementById('userName').innerText = 'Welcome ' + name;
          // console.log(user);
          
          console.log("stay");
          mainContainer.style.display = "";
        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("login.html");
        }
      });
}
    
init();

var add_data = function() {

  
  var proref = firebase.database().ref('Products');
  var quantity = document.getElementById('quan');
  var startdate = document.getElementById('sdatetime');
    // var proID = document.getElementById('proid');
    var enddate = document.getElementById('edatetime');
    // var currBid = document.getElementById('currBid');
  var productName = document.getElementById('naam');
  var pro_desc = document.getElementById('deescription');
  var start_Bid = document.getElementById('sttartbid');

 
  var addpro = proref.push(
    {
      name: productName.value,
      quantity: quantity.value,
      sdate:startdate.value,
      // id :proID.value,
      edate:enddate.value,
      currbid:'',
      description: pro_desc.value,
      startbid: start_Bid.value
    }

    
  
  );
  location.reload();


  };

  
 

  



  mainApp.addData = add_data;
mainApp.logout = logtout;


})();


