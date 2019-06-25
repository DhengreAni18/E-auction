window.onload = function() {
  if(localStorage.getItem("user_details") == null) {    
    window.location.replace('../login/login.html')
}
}

function logout() {
  window.location.href = '../login/login.html';
  localStorage.removeItem('user_details');  
}