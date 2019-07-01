
window.onload = function () {
  if (localStorage.getItem("user_details") == null) {
    // alert('Please login first !!');
    window.location.replace('../index.html')
  }
}

function logout() {
  window.location.href = '../../pages/index.html';
  localStorage.removeItem('user_details');
}

function addItem() {
  var ul = document.getElementById("pro2");
  var name = document.getElementById("name");
  var li = document.createElement("li");
  li.setAttribute('id', name.value);
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

function getLoggedUserDetails() {
  var user_details = localStorage.getItem("user_details");
  return JSON.parse(user_details);
}
function dhm(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;


  if(d<0 || h<0 || m<0 || s<0 ) {
    var result = 'Auction Over!!';
    return result;
  }
  var result = pad(d,2) + ':' + pad(h,2) + ':' + pad(m,2) + ':' + pad(s,2);
  return result;

}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$('#datetimepicker1').datetimepicker({
  format: 'YYYY/MM/DD HH:mm'
});
