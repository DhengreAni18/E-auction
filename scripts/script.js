
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




// function asd(a)
// {
//     if(a==0)
//     document.getElementById("asd").style.display="none";
//     else
//     document.getElementById("asd").style.display="block";
// }

// function parar(a)
// {
//     if(a==0)
//     document.getElementById("parar").style.display="none";
//     else
//     document.getElementById("parar").style.display="block";
// }

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


$( ".button-success" ).click(function() {
  $(this).next(".book").slideToggle( "slow", function() {
  // Animation complete.
});
});

var startDate ="06/08/2019" ;
var startTime ="4:00" ;
var endDate = "06/08/2019";
var endTime ="4:01" ;

var ts = moment( startDate + startTime, "M/D/YYYY H:mm").unix();
var ts1 = moment(endDate + endTime, "M/D/YYYY H:mm").unix();
var eventTime= ts1; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
var currentTime = ts; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
var diffTime = eventTime - currentTime;
var duration = moment.duration(diffTime*1000, 'milliseconds');
var interval = 1000;

setInterval(function(){
  if(duration == 0) {
  return;
  }
  
  duration = moment.duration(duration - interval, 'milliseconds');
    $('.countdown').text("Time Remaining : "+duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
}, interval);

  



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

