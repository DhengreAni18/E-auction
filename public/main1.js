(function(){
    
    // const config = {
    //     apiKey: "AIzaSyARxbH90BpomE-1nG42-x5HzZMQOr4yVaU",
    //    authDomain: "eauction-36b35.firebaseapp.com",
    //    databaseURL: "https://eauction-36b35.firebaseio.com",
    //    projectId: "eauction-36b35",
    //    storageBucket: "eauction-36b35.appspot.com",
    //    messagingSenderId: "151716692380",
    //    appId: "1:151716692380:web:77f840f0a99ffefd"
    //  };

    //  firebase.initializeApp(config);



        const preObject = document.getElementById('object');
        const dbRefObj = firebase.database().ref().child('object');
      

      dbRefObj.on('value', snap => console.log(snap.val()));
      
      
      
    
      
}());