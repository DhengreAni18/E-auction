var mApp = {};
(function(){


    var proref = firebase.database().ref('Products');

    var adddd =  function(){
        var addpro = proref.push(
            {
              name: document.getElementById('naame'),
              description: document.getElementById('deescription'),
              startbid: document.getElementById('sttartbid')
              
            }
          );
    }



mApp.addd = adddd;


})();


