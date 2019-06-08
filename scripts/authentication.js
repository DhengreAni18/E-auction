var mainApp = {};
(function(){

var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
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
          window.location.replace("login.html");
        }
      });
}
    
init();

var add_data = function() {
  var proref = firebase.database().ref('Products');
  var quantity = document.getElementById('quan');
  var startdate = document.getElementById('StartDate');
  var starttime = document.getElementById('StartTime');
  var enddate = document.getElementById('EndDate');
  var endtime = document.getElementById('EndTime');
  var productName = document.getElementById('naam');
  var pro_desc = document.getElementById('deescription');
  var start_Bid = document.getElementById('sttartbid');
  var addpro = proref.push(
    {
      name: productName.value,
      quantity: quantity.value,
      sdate:startdate.value,
      stime :starttime.value,
      edate:enddate.value,
      etime:endtime.value,
      description: pro_desc.value,
      startbid: start_Bid.value
    }
  
  );
    console.log(productName.value);
    console.log(pro_desc);
    console.log(start_Bid);

  };
  mainApp.addData = add_data;
mainApp.logout = logtout;


})();


