
  var socket = io.connect('http://localhost:9090' , {
    transports: ['websocket']
});

var auctions_data = [];

socket.emit('getAuctions', () => {});

socket.on('auctionData', (data) => {

            $('#productTableB tr').remove();

            var fragment = document.createDocumentFragment();
            var table = document.createElement("table");
            table.id = 'productTableB';

            auctions_data = data;

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

                        thead.innerHTML = '<tr>'+
                        '<th>Remaining Time</th>'+
                        '<th>Products</th>'+
                        '<th>Description</th>'+
                        '<th>Start-Bid</th>'+
                        '<th>Current-Bid</th>'+
                      '</tr>';

                      td1.innerHTML =  '<span class="badge badge-danger"  id="time_' + i + '">' +  remainT + '</span>';
                      space.innerHTML =  proName +'&nbsp;&nbsp;' +'<span style="color:red; font:bold 30px">' + '(' +quantity + ')' + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ '<button class="btn btn-outline-info btn-sm" id="bidlog_' + i + '" type="button" data-toggle="modal" data-target="#myModal" onclick = "showlog('+i+');">' +'Bid Log'+'</button>';
                        td5.innerHTML = descr;
                      td3.innerHTML =  stBid;
                      td2.innerHTML = crBid;
                
                      tr.appendChild(td1);
                      tr.appendChild(space);
                      tr.appendChild(td5);
                      tr.appendChild(td3);
                      tr.appendChild(td2);
                  
                      table.appendChild(tr);
                      table.className = 'table table-striped';

                    });
        
            table.appendChild(thead);

            fragment.appendChild(table);
            document.getElementById('auctions').appendChild(fragment);

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


            function AddProduct() {

              var quantity = document.getElementById('quan');
              var startdate = document.getElementById('sdatetime');
              var enddate = document.getElementById('edatetime');
              var productID = document.getElementById('pcode');
              var productName = document.getElementById('naam');
              var pro_desc = document.getElementById('deescription');
              var start_Bid = document.getElementById('sttartbid');

              socket.emit('productData' , {productCode:productID.value , productName:productName.value , Quantity: quantity.value , Description:pro_desc.value , startBid:start_Bid.value , startTime:startdate.value , endTime:enddate.value})
            
              alert('Successfully added a new product!!');

            }