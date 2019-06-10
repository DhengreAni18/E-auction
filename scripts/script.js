
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






function myFunction() {
  var x = document.getElementById("asd");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}



function myFunction1() {
  var x = document.getElementById("parar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}






  
