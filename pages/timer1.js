(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  //const socket = new WebSocket('ws://localhost:12251/getAuctions');

  var socket = io.connect('http://localhost:9090' , {
    transports: ['websocket']
});



var auctions_data = [];

socket.emit('getAuctions', null);

socket.on('auctionData', (data) => {


   

    auctions_data = data;

    $.each(auctions_data.auctions, function (i, item) {

        var start_ts = moment.unix(auctions_data.time_stamp);
        var end_ts = moment(item.edate, "YYYY/MM/DD H:mm:ss");
        var duration = moment.duration(end_ts.diff(start_ts));
        var remainT = dhm(duration.asMilliseconds());

        // var ms = duration._milliseconds;

        // console.log(result);
        

    // dhm();
        //  var  htmls = '<tr>';
        //     // html += '<tr> <th>Month</th> <th>Savings</th> <th>Savings</th> <th>Savings</th> <th>Savings</th></tr>'
        //     htmls +=  '<td>'+item.name+'</td>';
        //     htmls += '<td>'+remainT +'</td>';
        //     htmls += remainT;
        //     htmls += '</tr>';
        // htmls += ' <tr id="time_' + i + '">' + remainT + '</tr>';
        // document.write(dhm());
        // $(document.body).append(remainT);
        var html = '<li class="list-group-item"> ' +' <span class="badge badge-danger" style = "margin-right:200px;" id="time_' + i + '">' +  remainT + '</span>' ;
            html +=  '<span>' + item.startbid+ '</span>'

        html +=   item.name ;
        html += '</li>';

        $("#auctions").append(html);
        // $("#table").append(htmls);
        console.log('asd');
        
        console.log(dhm(duration.asMilliseconds()));
        
        // module.exports.remainT = remainT;
    });
 

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
    // console.log(remainT);
    
    module.exports.remainTime = dhm(duration.asMilliseconds());

},{}]},{},[1]);
