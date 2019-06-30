var socket = io.connect('http://localhost:12251', {
  transports: ['websocket']
});

var auctions_data = null;

var isAuctionTableCreated = false;

socket.emit('getAuctionsBidder', ({ token: getLoggedUserDetails().token }));


socket.on('getAuctionsBidderCallback', (response) => {

  var fragment = document.createDocumentFragment();
  var table = document.createElement("table");
  table.id = 'productTableB';

  if (response.status) {

    auctions_data = response.value;

    if (!isAuctionTableCreated) {

      $('#productTableB tr').remove();


      thead = document.createElement("thead");

      thead.innerHTML = '<tr>' +
        '<th>Remaining Time</th>' +
        '<th>Products</th>' +
        '<th>Description</th>' +
        '<th>Start-Bid</th>' +
        '<th>Current-Bid</th>' +
        '<th>Place your Bid</th>' +
        '</tr>';

      table.appendChild(thead);

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


        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");
        space = document.createElement("td");
        td4 = document.createElement("td");
        td5 = document.createElement("td");



        td1.innerHTML = '<span class="badge badge-danger"  id="time_' + pcodee + '">' + remainT + '</span>';
        space.innerHTML = proName + '&nbsp;&nbsp;' + '<span style="color:red; font:bold 30px">' + '(' + quantity + ')' + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<button class="btn btn-outline-info btn-sm  bidbtnn" id="bidlog_' + pcodee + '" type="button" data-toggle="modal" data-target="#myModal" onclick = "showlog(' + pcodee + ');">' + 'Bid Log' + '</button>';
        td5.innerHTML = descr;
        td3.innerHTML = stBid;
        td2.innerHTML = '<span id = "cuurbid_' + pcodee + '">' + crBid + '</span>';
        td4.innerHTML = '<input type="hidden" required id="pcode_' + pcodee + '" value="' + pcodee + '" />' + '<input placeholder="Bid amount" id="bidamt_' + pcodee + '" style="width:120px; , padding-left:50px;"  type="text">' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<button class="btn-primary"  onclick = "submitBid(' + pcodee + ');"  >' + 'Place Bid' + '</button>';

        tr.appendChild(td1);
        tr.appendChild(space);
        tr.appendChild(td5);
        tr.appendChild(td3);
        tr.appendChild(td2);
        tr.appendChild(td4);

        td3.id = "stbid_" + i;
        // td2.id = "crbid_" + i;

        table.appendChild(tr);
        table.className = 'table table-striped';

      });

      fragment.appendChild(table);
      document.getElementById('tablee').appendChild(fragment);

      document.getElementById('userName').innerText = 'Welcome ' + getLoggedUserDetails().user_name;

      window.setInterval(function () {

        var new_date = moment.unix(auctions_data.time_stamp).add(1, 'seconds');
        auctions_data.time_stamp = new_date.unix();

        updateData();
      }, 1000);

      isAuctionTableCreated = true;
    }
    else {
      updateData();
    }

  }

  else {
    alert(response.message);
  }

});


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
  
  var result = d + 'd' + " " + h + 'h' + " " + m + 'm' + " " + s + 's';
  return result;

}

function updateData() {
  $.each(auctions_data.auctions, function (i, item) {

    var start_ts = moment.unix(auctions_data.time_stamp);
    var end_ts = moment(item.edate, "YYYY/MM/DD H:mm:ss");
    var duration = moment.duration(end_ts.diff(start_ts));
    var remainT = dhm(duration.asMilliseconds());

    var currentBid = item.currbid;
    $("#cuurbid_" + item.pcode).html(currentBid);

    $("#time_" + item.pcode).html(remainT);
  });
}



function submitBid(i) {
  var bidamount = $('#bidamt_' + i).val();
  var starttbid = $('#stbid_' + i).text();
  var currentBid = $('#cuurbid_' + i).text();
  
  var postBidObject = {
    Bid_amt: $('#bidamt_' + i).val(),
    product_code: $('#pcode_' + i).val(),
    token: getLoggedUserDetails().token,
    user_id: getLoggedUserDetails().user_id,
    curbid: currentBid,
    startBid: starttbid
  };

  socket.emit('postBid', postBidObject);
}

socket.on('postBidCallback', (response) => {
  
  Swal.fire({
    type: response.msg,
    title: response.message
  });
  if (response.status) {
    $('#bidamt_' + response.value.product_code).val('');
  }
});

socket.on('unAuthorizedCallback', (response) => {
  Swal.fire(
    response.message
  )
});


fragmentt = document.createDocumentFragment();
tablee = document.createElement("table");

function showlog(i) {
  $('#loggTTable tr').remove();

  socket.emit('bidlogForBidder', { product_code: $('#pcode_' + i).val(), user_id: getLoggedUserDetails().user_id, token: getLoggedUserDetails().token })

  socket.on('bidLogForBidderCallback', (response) => {

    postlog_data = response;
    $('#loggTTable tr').remove();

    $.each(postlog_data.value.logs, (i, item) => {

      var BidAmt = item.bid_amount;
      var tstamp = item.time_stamp;
      var timeStamp = moment.unix(tstamp).format("MM/DD/YYYY H:mm")

      trow = document.createElement("tr");
      td11 = document.createElement("td");
      td22 = document.createElement("td");

      td11.innerHTML = timeStamp;
      td22.innerHTML = BidAmt;

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


socket.on('unAuthorizedCallback', (response) => {
  Swal.fire(
    response.message
  )
});

