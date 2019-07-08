var variables = require('./variables');
var fireBase = require('./firebase');
var redis = require('./redis');
const uuidv4 = require('uuid/v4');
var moment = require("moment");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var crypto = require('crypto');
var helper = require('./helper');

io.set('transports', ['websocket']);

server.listen(variables.SERVER_PORT);

console.log("on port" + variables.SERVER_PORT);
console.log("Server Running");


var timeStampHelper = new helper.TimeStampHelper();

var isAdminUser = (token) => {
        return new Promise((resolve) => {

                redis.redis_client.hmget(variables.KEY_ADMIN_TOKENS, [token, token], function (error, result) {

                        if (error) {
                                console.log(error);
                                throw error;
                        }

                        var user_details = JSON.parse(result[0]);

                        if (user_details != null && user_details.user_id != "") {
                                console.log("From Validation true: " + result);
                                resolve(true);
                        }
                        else {
                                console.log("From Validation false: " + result);
                                resolve(false);
                        }
                });
        });
};


var isBidder = (token) => {
        return new Promise((resolve) => {

                redis.redis_client.hmget(variables.KEY_USER_TOKENS, [token, token], function (error, result) {

                        if (error) {
                                console.log(error);
                                throw error;
                        }

                        var user_details = JSON.parse(result[0]);

                        if (user_details != null && user_details.user_id != "") {
                                console.log("From Validation true: " + result);
                                resolve(true);
                        }
                        else {
                                console.log("From Validation false: " + result);
                                resolve(false);
                        }
                });
        });
};

isAdminAdded();

io.on('connect', (socket) => {
        console.log("Client Connected");

        socket.on('authenticateUser', (data) => {
                authenticateUser(data, socket);
        });

        socket.on('getAuctionsBidder', (request) => {

                var response = new CustomResponse();

                executeInPromise(isBidder, request, (result) => {

                        if (result) {

                                var usersRef = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_MAIN_TABLE).orderByChild("edate");

                                usersRef.on("value", function (snapshot) {


                                        var data = {};
                                        data.time_stamp = timeStampHelper.getCurrentTimeStamp('unix');
                                        data.auctions = [];

                                        var auction_data = snapshot.val();

                                        snapshot.forEach((child) => {
                                                console.log(child.val());
                                                var item = child.val();
                                                item.pcode = child.key;
                                                console.log(item);
                                                data.auctions.push(item);
                                        });
                                        response.value = data;
                                        response.status = true;
                                        console.log(data);
                                        request.isCalled = false;
                                        socket.emit('getAuctionsBidderCallback', response);
                                        return;

                                }, function (errorObject) {
                                        response.message = "Firebase fetch Error : " + errorObject.code;
                                        socket.emit('getAuctionsBidderCallback', response);
                                        return;
                                });

                        } else {
                                response.message = "Error : Invaild / Un-Authorized User. Only Bidder can access this area.";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });

        });

        socket.on('getAuctionsAdmin', (request) => {

                var response = new CustomResponse();

                executeInPromise(isAdminUser, request, (result) => {

                        if (result) {

                                var auctionSubTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_MAIN_TABLE).orderByChild("edate");

                                auctionSubTable.on("value", function (snapshot) {

                                        var data = {};
                                        data.time_stamp = timeStampHelper.getCurrentTimeStamp('unix');
                                        data.auctions = [];

                                        var auction_data = snapshot.val();

                                        snapshot.forEach((child) => {                                        
                                                var item = child.val();
                                                item.pcode = child.key;
                                                item.user_name = getUserDetails(item.user_id);
                                                data.auctions.push(item);
                                        });
                                        response.value = data;
                                        console.log(data);
                                        
                                        response.status = true;

                                        socket.emit('getAuctionsAdminCallback', response);
                                        return;

                                }, function (errorObject) {
                                        response.message = "Firebase fetch Error : " + errorObject.code;
                                        socket.emit('getAuctionsAdminCallback', response);
                                        return;
                                });

                        } else {
                                response.message = "Error : Invaild / Un-Authorized User. Only Admin can access this area.";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });

        });


        socket.on('typing' , function(data) {
                if(data) {
                        socket.emit('typing_callback',data);
                        console.log(data);                             
                }
                
        });

        socket.on('postBid', (request) => {

                console.log("Bid Request " + JSON.stringify(request));

                var response = new CustomResponse();
                var currentDateandTime = timeStampHelper.getCurrentTimeStamp('unix');

                executeInPromise(isBidder, request, (result) => {

                        if (result) {


                                if (request.Bid_amt == 0) {
                                        response.msg = "error"
                                        response.message = 'Enter a bid value';
                                        socket.emit('postBidCallback', response);
                                        return;
                                }
                                else {
                                        new Promise(function (resolve, reject) {

                                                var auctionMainDataParticularAuction = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_MAIN_TABLE + '/' + request.product_code);

                                                var lowestBid = 0;

                                                auctionMainDataParticularAuction.once('value', function (snapshot) {


                                                        console.log(snapshot);

                                                        if (snapshot.val().currbid == 0) {
                                                                lowestBid = snapshot.val().startbid;
                                                        }
                                                        else {
                                                                lowestBid = snapshot.val().currbid;
                                                        }

                                                        resolve(lowestBid);

                                                }, function (errorObject) {

                                                });

                                        }).then(function (result) {

                                                if (request.Bid_amt >= result) {
                                                        response.msg = "error"
                                                        console.log("before");
                                                        response.message = 'Bid value cannot be greater than or equal to ' + result;
                                                        console.log(response.message);
                                                        socket.emit('postBidCallback', response);
                                                        return;
                                                }

                                                var addBidToSubTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_SUB_TABLE + '/' + request.product_code + '/' + currentDateandTime).update(
                                                        {
                                                                time_stamp: Number(currentDateandTime),
                                                                bid_amount: Number(request.Bid_amt),
                                                                user_id: request.user_id,
                                                        }, function (error) {
                                                                if (error) {
                                                                        response.message = "Firebase Write Error : " + error;
                                                                        socket.emit('postBidCallback', response);
                                                                        return;
                                                                }
                                                        }
                                                );

                                                var addBidToMainTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_MAIN_TABLE + '/' + request.product_code).update({
                                                        currbid: Number(request.Bid_amt),
                                                        user_id: request.user_id
                                                }, function (error) {
                                                        if (error) {
                                                                response.message = "Firebase Write Error : " + error;
                                                                socket.emit('postBidCallback', response);
                                                                return;
                                                        }
                                                });
                                                response.status = true;
                                                response.msg = "success";
                                                response.value.product_code = request.product_code;
                                                response.message = 'Bid Posted Successfully';
                                                socket.emit('postBidCallback', response);
                                                return;
                                        });

                                }
                        }
                        else {

                                response.message = "Error : Invaild / Un-Authorized User. Only Bidder can access this area.";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });
        })

        socket.on('addNewAuction', (request) => {

                var response = new CustomResponse();


                executeInPromise(isAdminUser, request, (result) => {

                        if (result) {
                                var auctionMainTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_MAIN_TABLE + '/' + request.productCode);
                                console.log(request);

                                if (request.productName == 0 || request.Quantity == 0 || request.startTime == 0 || request.endTime == 0 || request.startBid == 0) {
                                        response.msg = "error"
                                        response.message = "All inputs are mandatory"
                                        socket.emit('addNewAuctionCallback', response);
                                }

                                if(!isNaN(request.productCode)) {
                                        response.msg = "error"
                                        response.message = "Product ID must be a number"
                                        socket.emit('addNewAuctionCallback', response);
                                }

                                else {
                                        var addpro = auctionMainTable.update(
                                                {
                                                        name: request.productName,
                                                        description: request.Description,
                                                        quantity: request.Quantity,
                                                        sdate: request.startTime,
                                                        edate: request.endTime,
                                                        startbid: Number(request.startBid),
                                                        currbid: 0,
                                                        user_id: ''
                                                }, function (error) {
                                                        if (error) {
                                                                response.message = "Firebase Write Error : " + error;
                                                                socket.emit('addNewAuctionCallback', response);
                                                                return;
                                                        }
                                                }
                                        );
                                        response.msg = "error"
                                        response.message = "Product Added"
                                        response.status = true;
                                        socket.emit('addNewAuctionCallback', response);
                                        return;
                                }

                        } else {

                                response.message = "Error : Invaild / Un-Authorized User. Only Admin can add auctions. ";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });
        });


        socket.on('addNewBidder', (request) => {

                var response = new CustomResponse();
                const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;


                executeInPromise(isAdminUser, request, (result) => {

                        if (result) {
                                var Bidder = {
                                        user_id: request.bidder_id,
                                        user_email: request.bidder_email,
                                        user_name: request.bidder_name,
                                        user_access: "b",
                                        user_password: "0192023a7bbd73250516f069df18b500"
                                };

                                var auctionUserTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_USER_TABLE + '/' + request.bidder_id);


                                if (request.bidder_id == 0 || request.bidder_email == 0 || request.bidder_name == 0) {

                                        console.log('bidder??');
                                        response.msg = "error"
                                        response.message = "All inputs are mandatory"

                                        socket.emit('addNewBidderCallback', response);
                                        return;
                                }

                                if(!emailRegex.test(request.bidder_email)) {
                                        console.log('asdasd');
                                        response.msg = "error"
                                        response.message = "Enter correct email ID"

                                        socket.emit('addNewBidderCallback', response);
                                        return;
                                        
                                }

                                else {
                                        addNewUser(Bidder);
                                        response.msg = "success"
                                        response.status = true;
                                        response.message = "Bidder Added"
                                        socket.emit('addNewBidderCallback', response);

                                        auctionUserTable.update({
                                                user_id: request.bidder_id,
                                                user_email: request.bidder_email,
                                                user_name: request.bidder_name,
                                                user_access: "b",
                                                user_password: "0192023a7bbd73250516f069df18b500"
                                        }, function (error) {
                                                if (error) {
                                                        response.message = "Firebase Write Error : " + error;
                                                        socket.emit('addNewBidderCallback', response);
                                                }
                                        })

                                        return;
                                }

                        } else {
                                response.message = "Error : Invaild / Un-Authorized User. Only Admin can add auctions. ";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });
        });


        socket.on('bidlogForBidder', (request) => {

                var response = new CustomResponse();


                executeInPromise(isBidder, request, (result) => {

                        if (result) {

                                var mainTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_SUB_TABLE + '/' + request.product_code).orderByChild('user_id').equalTo(request.user_id);

                                mainTable.once("value", function (snapshot) {

                                        var logdata = {};
                                        logdata.logs = [];

                                        var loggsdata = snapshot.val();
                                        var i = 0;

                                        for (i in loggsdata) {
                                                logdata.logs.push(loggsdata[i]);
                                        }

                                        response.value = logdata;
                                        response.status = true;
                                        console.log(response.value);
                                        socket.emit('bidLogForBidderCallback', response);
                                        return;

                                }, function (errorObject) {
                                        response.message = "Firebase fetch Error : " + errorObject.code;
                                        socket.emit('bidLogForBidderCallback', response);
                                        return;
                                });
                        } else {

                                response.message = "Error : Invaild / Un-Authorized User. Only Bidder can access this area.";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });
        });

        socket.on('bidlogForAdmin', (request) => {
                var response = new CustomResponse();

                executeInPromise(isAdminUser, request, (result) => {

                        if (result) {

                                console.log(request.product_code);

                                var auctionSubTable = fireBase.fireBaseConnection.database().ref(variables.KEY_AUCTION_SUB_TABLE + '/' + request.product_code).orderByChild('bid_amount');

                                auctionSubTable.once("value", function (snapshot) {

                                        var request = {};
                                        request.logs = [];
                                        var Aloggsdata = snapshot.val();
                                        var i = 0;

                                        for (i in Aloggsdata) {
                                                request.logs.push(Aloggsdata[i]);
                                        }
                                        response.value = request;
                                        console.log(response.value);

                                        response.status = true;
                                        socket.emit('bidlogForAdminCallBack', response)
                                        return;

                                }, function (errorObject) {
                                        response.message = "Firebase fetch Error : " + errorObject.code;
                                        socket.emit('bidlogForAdminCallBack', response);
                                        return;
                                });
                        } else {

                                response.message = "Error : Invaild / Un-Authorized User. Only Admin User can access this area.";
                                socket.emit('unAuthorizedCallback', response);
                                return;
                        }
                });
        })
});



function isAdminAdded() {
        redis.redis_client.hmget(variables.KEY_USERS, ['user_id', 'admin'], function (error, result) {

                console.log("2");

                if (error) {
                        console.log(error);
                        reject(error);
                }

                if (result[1] == null) {

                        var admin = {
                                user_id: "admin",
                                user_email: "admin@auction.com",
                                user_name: "Administrator",
                                user_access: "a",
                                user_password: "0192023a7bbd73250516f069df18b500"
                        };

                        var bidder = {
                                user_id: "bidder_1",
                                user_email: "bidder1@auction.com",
                                user_name: "Bidder 1",
                                user_access: "b",
                                user_password: "0192023a7bbd73250516f069df18b500"
                        };

                        var bidder2 = {
                                user_id: "bidder_2",
                                user_email: "bidder2@auction.com",
                                user_name: "Bidder 2",
                                user_access: "b",
                                user_password: "0192023a7bbd73250516f069df18b500"
                        };

                        addNewUser(admin);
                        addNewUser(bidder);
                        addNewUser(bidder2);
                        console.log("Not Added");
                        //resolve("3")
                }
                else {
                        console.log("Added");
                        //console.log(JSON.stringify(result[1]));
                        //resolve("4")
                }
        });

        console.log("4");

}

function addNewUser(new_user) {
        new_user.token = uuidv4();

        redis.redis_client.hmset(variables.KEY_USERS, new_user.user_id, JSON.stringify(new_user), function (err, reply) {
                if (err) throw err;
                console.log("Reply User Add: " + reply);
        });


        if (new_user.user_access == "a") {
                redis.redis_client.hmset(variables.KEY_ADMIN_TOKENS, new_user.token, new_user.token, function (err, reply) {
                        if (err) throw err;
                        console.log("Reply TOKEN: " + reply);
                });
        }
        else {
                redis.redis_client.hmset(variables.KEY_USER_TOKENS, new_user.token, new_user.token, function (err, reply) {
                        if (err) throw err;
                        console.log("Reply TOKEN: " + reply);
                });
        }
}

function authenticateUser(credential, socket) {

        console.log(JSON.stringify(credential))

        redis.redis_client.hmget(variables.KEY_USERS, ['user_id', credential.user_id], function (error, result) {

                var resp = new CustomResponse();

                if (error) {
                        console.log(error);
                        resp.message = "Data Fetch Error : " + error;
                        socket.emit("authResponse", resp);
                        return;
                }

                console.log(JSON.stringify(result))

                if (result[1] == null) {
                        resp.message = "Error : Invalid E-Mail / Password";
                        socket.emit("authResponse", resp);
                }
                else {
                        var dbResponse = JSON.parse(result[1]);

                        if (helper.getMD5Hash(credential.user_password) == dbResponse.user_password) {

                                var token = uuidv4();

                                if (dbResponse.user_access == "a") {
                                        redis.redis_client.hmset(variables.KEY_ADMIN_TOKENS, token, JSON.stringify({ user_id: dbResponse.user_id, token: token, time_stamp: moment().unix() }), function (err, reply) {
                                                if (err) throw err;

                                                resp.status = true;

                                                resp.value = {
                                                        user_id: dbResponse.user_id,
                                                        user_name: dbResponse.user_name,
                                                        user_email: dbResponse.user_email,
                                                        user_access: dbResponse.user_access,
                                                        token: token
                                                };

                                                socket.emit("authResponse", resp);
                                                return;
                                        });
                                }
                                else {
                                        redis.redis_client.hmset(variables.KEY_USER_TOKENS, token, JSON.stringify({ user_id: dbResponse.user_id, token: token, time_stamp: moment().unix() }), function (err, reply) {
                                                if (err) throw err;

                                                resp.status = true;

                                                resp.value = {
                                                        user_id: dbResponse.user_id,
                                                        user_name: dbResponse.user_name,
                                                        user_email: dbResponse.user_email,
                                                        user_access: dbResponse.user_access,
                                                        token: token
                                                };
                                                console.log("Reply TOKEN: " + reply);
                                                socket.emit("authResponse", resp);
                                                return;
                                                
                                        });
                                }
                        }
                        else {
                                resp.message = "Error : Invalid E-Mail / Password";
                                socket.emit("authResponse", resp);
                                console.log("Reply TOKEN: " + reply);
                        }
                }

        });
}

function getUserDetails(user_id) {

        return new Promise((resolve) => {
                redis.redis_client.hmget(variables.KEY_USERS, ['user_id', user_id], function (error, result) {

                        var resp = new CustomResponse();

                        if (error) {
                                console.log(error);
                                resp.message = "Data Fetch Error : " + error;
                                socket.emit("authResponse", resp);
                                return;
                        }

                        console.log(JSON.stringify(result))

                        if (result[1] == null) {                                
                                resolve("");
                        }
                        else {
                                var dbResponse = JSON.parse(result[1]);
                                resolve(dbResponse.user_name);
                        }

                });
        });
}


function CustomResponse() {
        this.status = false;
        this.message = "";
        this.value = {};
}

function executeInPromise(typeOfValidateion, request, callback) {
        new Promise(function (resolve, reject) {
                resolve(typeOfValidateion(request.token));
        }).then(function (result) { // (**)
                callback(result);
        });
}