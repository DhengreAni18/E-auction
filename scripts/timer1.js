  //const socket = new WebSocket('ws://localhost:12251/getAuctions');

  var socket = io.connect('http://localhost:9090' , {
    transports: ['websocket']
});




var auctions_data = [];

socket.emit('getAuctions', {


});

socket.on('auctionData', (data) => {

    $('#productTableB tr').remove();


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
         stBid = item.startbid;
         crBid = item.currbid;
        var pcodee = item.pcode;
        var quantity = item.quantity;
        var descr = item.description;

        $('#productTableB tr').remove();

        
        thead = document.createElement("thead");
        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");
        space = document.createElement("td");
        td4 = document.createElement("td");
        td5 = document.createElement("td");

        thead.innerHTML = '<tr>'+
        '<th>Remaining Time</th>'+
        '<th>Products</th>'+
        '<th>Description</th>'+
        '<th>Start-Bid</th>'+
        '<th>Current-Bid</th>'+
        '<th>Place your Bid</th>'+
      '</tr>';

       td1.innerHTML =  '<span class="badge badge-danger"  id="time_' + i + '">' +  remainT + '</span>';
       space.innerHTML =  proName +'&nbsp;&nbsp;' +'<span style="color:red; font:bold 30px">' + '(' +quantity + ')' + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ '<button class="btn btn-outline-info btn-sm" id="bidlog_' + i + '" type="button" data-toggle="modal" data-target="#myModal" onclick = "showlog('+i+');">' +'Bid Log'+'</button>';
        td5.innerHTML = descr;
       td3.innerHTML =  stBid;
       td2.innerHTML = crBid;
       td4.innerHTML = '<input type="hidden" required id="pcode_' + i + '" value="' + pcodee + '" />'+'<input placeholder="Bid amount" id="bidamt_' + i + '" style="width:120px; , padding-left:50px;"  type="text">' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<button class="btn-primary"  onclick = "submitBid('+i+');"  >' +  'Place Bid' + '</button>' ;


 
       tr.appendChild(td1);
       tr.appendChild(space);
       tr.appendChild(td5);
       tr.appendChild(td3);
       tr.appendChild(td2);
       tr.appendChild(td4);

       td3.id ="stbid_" + i ;
       td2.id ="crbid_" + i ;

       table.appendChild(tr);
       table.className = 'table table-striped';

                
    });
 
    table.appendChild(thead);

    fragment.appendChild(table);
    document.getElementById('tablee').appendChild(fragment);

    document.getElementById('userName').innerText = 'Welcome ' + localStorage.getItem("userN");

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

        $("#time_" + i).html(remainT);
    });
}


                function submitBid(i) {
                  var bidamount = $('#bidamt_' + i).val();
                  var starttbid =  $('#stbid_' + i).text(); 
                  var currentBid = $('#crbid_' + i).text();
                  
                  
                  if(bidamount == 0) {
                    alert('Enter a bid value');
                  }


                  else if(bidamount > starttbid) {
                        alert('Bid amount should be lesser than the start bid');
          
                      }

                  else if(currentBid != 0) {
                      if(bidamount > currentBid) {
                        alert('Bid amount should be lesser than the current bid');
                      }

                      else {
                        socket.emit('postBid', { Bid_amt: $('#bidamt_' + i).val() , product_code: $('#pcode_' + i).val() , token:localStorage.getItem("userT") , name:localStorage.getItem("userN")  });
                      }
                  }

                  else {
                        socket.emit('postBid', { Bid_amt: $('#bidamt_' + i).val() , product_code: $('#pcode_' + i).val() , token:localStorage.getItem("userT") , name:localStorage.getItem("userN")  });
                      }
                }


                 fragmentt = document.createDocumentFragment();
                  tablee = document.createElement("table");

                        function showlog(i) {

                          socket.emit('bidlog' , {product_code: $('#pcode_' + i).val() , name:localStorage.getItem("userN")} )

                          
                                
                                socket.on('postlogdata' , (postlog) => {

                                  $('#loggTTable tr').remove();

                                    postlog_data = postlog;

                                  $.each(postlog_data.logs, (i , item) => {


                                    var BidAmt = item.Bid;
                                    var tstamp = item.BidTime;

                                    trow = document.createElement("tr");
                                    td11 = document.createElement("td");
                                    td22 = document.createElement("td");

                                    console.log(BidAmt);
                                    console.log(tstamp);
                            
                                   td11.innerHTML =    tstamp
                                   td22.innerHTML =  BidAmt;

                                  trow.appendChild(td11);
                                  trow.appendChild(td22);


                                  tablee.appendChild(trow);
                                  tablee.className = 'table table-striped';

                                    tablee.id = 'loggTTable';

                                  })
                                     
                                     })
                                
                            };

                            

                            fragmentt.appendChild(tablee);
                            document.getElementById('logTable').appendChild(fragmentt);
                            
    // console.log(remainT);
    
    // module.exports.remainTime = remainT;


