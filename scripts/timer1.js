  //const socket = new WebSocket('ws://localhost:12251/getAuctions');

  var socket = io.connect('http://localhost:9090' , {
    transports: ['websocket']
});



var auctions_data = [];

socket.emit('getAuctions', () => {


});

socket.on('auctionData', (data) => {

    

    var fragment = document.createDocumentFragment();
    var table = document.createElement("table");
    table.id = 'productTableB';

    auctions_data = data;

    $('#productTableB tr').remove();
    $.each(auctions_data.auctions, function (i, item) {

        

        var start_ts = moment.unix(auctions_data.time_stamp);
        var end_ts = moment(item.edate, "YYYY/MM/DD H:mm:ss");
        var duration = moment.duration(end_ts.diff(start_ts));
        var remainT = dhm(duration.asMilliseconds());
        var proName = item.name;
        var stBid = item.startbid;
        var crBid = item.currbid;
        var pcodee = item.pcode;
        var quantity = item.quantity;
        var descr = item.description;
        
        thead = document.createElement("thead");
        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");
        space = document.createElement("td");
        td4 = document.createElement("td");
        td5 = document.createElement("td");
       // space.innerHTML = '<div> </div>';
       // var th = document.createElement("th");      // TABLE HEADER.
       // th.innerHTML = trValues[i];
    //    $('#productTableB tr').remove();

        thead.innerHTML = '<tr>'+
        '<th>Remaining Time</th>'+
        '<th>Products</th>'+
        '<th>Product Description</th>'+
        '<th>Start-Bid</th>'+
        '<th>Current-Bid</th>'+
        '<th>Place your Bid</th>'+
      '</tr>';

       td1.innerHTML =  '<span class="badge badge-danger"  id="time_' + i + '">' +  remainT + '</span>';
       space.innerHTML =  proName +'&nbsp;&nbsp;' +'<span style="color:red; font:bold 30px">' + '(' +quantity + ')' + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ '<button class="btn btn-outline-info btn-sm" id="bidlog_' + i + '" type="button" data-toggle="modal" data-target="#myModal" onclick = "showlog('+i+');">' +'Bid Log'+'</button>';
        td5.innerHTML = descr;
       td3.innerHTML =  stBid;
       td2.innerHTML = crBid;
       td4.innerHTML = '<input type="hidden" required id="pcode_' + i + '" value="' + pcodee + '" />'+'<input placeholder="Bid amount" id="bidamt_' + i + '" style="width:120px; , padding-left:50px;"  type="text">' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<button class="btn-primary"  id="bidbtn_' + i + '" onclick="submitBid(' +i +');" >' +  'Place Bid' + '</button>' ;

 
       tr.appendChild(td1);
       tr.appendChild(space);
       tr.appendChild(td5);
       tr.appendChild(td3);
       tr.appendChild(td2);
       tr.appendChild(td4);
   
       table.appendChild(tr);
       table.className = 'table table-striped';

                
    });
 
    table.appendChild(thead);

    fragment.appendChild(table);
    document.getElementById('tablee').appendChild(fragment);

    






    window.setInterval(function () {


        var new_date = moment.unix(auctions_data.time_stamp).add(1, 'seconds');
        auctions_data.time_stamp = new_date.unix();

        updateData();
    }, 1000);


});








function dhm(ms) {
    var d, h, m, s;
    s = Math.floor(ms/ 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    var result = d + ":" + h + ":" + m + ":" + s;
    return result;
    
    
}

function updateData() {


    $.each(auctions_data.auctions, function (i, item) {

        var start_ts = moment.unix(auctions_data.time_stamp);
        var end_ts = moment(item.edate, "YYYY/MM/DD H:mm:ss");
        var duration = moment.duration(end_ts.diff(start_ts));
        var remainT = dhm(duration.asMilliseconds());

        //alert(("#time_" + i));
        $("#time_" + i).html(remainT);
    });
}






                function submitBid(i) {
                    var bidAmount = $('#bidamt_' + i).val();
                    var Pcode = $('#pcode_' + i).val();

                    // alert(Pcode);
                    

                    var user = firebase.auth().currentUser;
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                    
                        if(bidAmount ==0) {
                            alert('Bid amount cannot be empty');
                        }

                        else {
                    name = user.displayName;
                    uidd = user.uid;
                
                    var userData = firebase.database().ref('users/' + uidd+'/' + i  );
                    var ProData = firebase.database().ref('Products').orderByChild('pcode').equalTo(i); 


                        var currentDateandTime = moment().format('YYYY MM DD , hh:mm:ss');
                // var id = document.getElementById('prodid');
                // var bid = document.getElementById('bidd');
                alert('Placed Bid Successfully');
                //  alert(Pcode);
                //  alert(currentDateandTime);
                var addUser = userData.push (
                    {
                    BidTime: currentDateandTime,
                    Bid: bidAmount,
                    Pcode: Pcode
                    }
                );

                ProData.on("value", function(snapshot) {
                    snapshot.forEach(function(data) {
                        console.log(data.key);
                        var PushData = firebase.database().ref('Products/' + data.key ).update({
                            currbid:bidAmount
                        })
                    });
                });
                
                
                
                // location.reload();
                    console.log(name);
                    console.log(uidd);
                    
                    } }
                });
                
                }


                 fragmentt = document.createDocumentFragment();
                  tablee = document.createElement("table");

                        function showlog(i) {

                            firebase.auth().onAuthStateChanged(function(user) {
                                if (user) {
                                  // User is signed in.
                                  name = user.displayName;
                                  uidd = user.uid;
                                  // console.log(user);
                                  $('#loggTTable tr').remove();

                                  var usersData = firebase.database().ref('users/' + uidd  +'/'+ i );
                                  usersData.once('value', function (snapshot) {
                                     
                                    snapshot.forEach((function(CChild) { 

                                        var logValue = CChild.val();
                                        var BidAmt = logValue.Bid;
                                        var tstamp = logValue.BidTime;


                                        trow = document.createElement("tr");
                                        td11 = document.createElement("td");
                                        td22 = document.createElement("td");

                                        console.log(BidAmt);
                                        console.log(tstamp);

                                        
                                
                                       td11.innerHTML =    tstamp
                                       td22.innerHTML =  BidAmt;

                                    //    logmodal = '<ul>'+'<li>' +tstamp + '------' + BidAmt +'</li>'+ '</ul>'

                                     

                                        // $("#logTable").append(logmodal);

                                      trow.appendChild(td11);
                                      trow.appendChild(td22);


                                      tablee.appendChild(trow);
                                      tablee.className = 'table table-striped';

                                        // console.log('asd');
                                        tablee.id = 'loggTTable';
                                        


                                    
                                    }));
                                   
                                  });
                                } 
                              });

                            };

                            

                            fragmentt.appendChild(tablee);
                            document.getElementById('logTable').appendChild(fragmentt);
                            
    // console.log(remainT);
    
    // module.exports.remainTime = remainT;


