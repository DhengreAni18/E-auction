
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




function asd(a)
{
    if(a==1)
    document.getElementById("asd").style.display="none";
    else
    document.getElementById("asd").style.display="block";
}

function myFunction() {
  var x = document.getElementById("asd");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
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



// var now = moment(new Date()); //todays date
// var end = moment("2019-06-5"); // another date
// var duration = moment.duration(now.diff(end));
// var days = duration.asHours();
// console.log(days)

