function addItem(){
	var ul = document.getElementById("pro2");
  var name = document.getElementById("name");
  var li = document.createElement("li");
  li.setAttribute('id',name.value);
  li.appendChild(document.createTextNode(name.value));
  ul.appendChild(li);
}

function removeItem(){
	var ul = document.getElementById("");
  var name = document.getElementById("name");
  var item = document.getElementById(name.value);
  ul.removeChild(item);
}


function addddd() {
    var proref = firebase.database().ref('Products');
    
    var addpro = proref.push(
      {
        name: document.getElementById('naam'),
        description: document.getElementById('deescription'),
        startbid: document.getElementById('sttartbid')
      }
    
    );
      console.log(naam);
}


// function Delete(key,uid){
//     var feedRef = firebase.database.ref("Products").child(uid).child(key);
//     feedRef.remove()
//     .then(function(){
//       console.log("Remove succeeded.")
//     })
//     .catch(function(error){
//       console.log("Remove Failed!"+error.message)
//     });
// }

