
window.onload = function() {
  if(localStorage.getItem("user_details") == null) {
    // alert('Please login first !!');
    window.location.replace('../index.html')
}
}

function logout() {
  window.location.href = '../../pages/index.html';
  localStorage.removeItem('user_details');  
}

function addItem(){
	var ul = document.getElementById("pro2");
  var name = document.getElementById("name");
  var li = document.createElement("li");
  li.setAttribute('id',name.value);
  li.appendChild(document.createTextNode(name.value));
  ul.appendChild(li);
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

function getLoggedUserDetails()
{
  var user_details = localStorage.getItem("user_details");
  return JSON.parse(user_details);
}




  


