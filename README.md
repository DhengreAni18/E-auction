# E-auction
### A Realtime web based online auction platform.


:arrow_forward:  Installation

@E-auction/serverside/ to install node dependencies :

```bash
npm install
```

:fire: *__Technologies Used__ :*

* __Firebase realtime database :__ Firebase realtime database has been used to store the data of users, products, etc. The realtime database helps to keep track of every change in the data values and reflects to user as any data changes.

* __Nodejs__ as Backend language : Nodejs server has been setup to communicate between client and server. It's been used as an intermediate which connects to the firebase and take data from its database the shows at frontend.

* __SocketIO__ : SocketIO has been integrated with the nodejs server to avoid long polling and use websockets for faster communication and response to client.

* __MomentJS__ : MomentJS a javascript time and date library has been used to handle all timestamp related things.


:star: *__Key features of Project__ :*


1. __Realtime Database__ : With the use of realtime database the Admin as well as Bidder user get to know the change in the bid values as the bidder bids, due to the database it always listen for the changes in the database and reflects to the user as the data undergoes some changes.

2. __Serverside Validations__ : Due to serverside validations, the bidder as well as the admin cannot access the parts or functions accessible to certain type of users only.

3. __Auction Timer__ : As the timer is implemented on the serverside using momentjs and nodejs, the user cannot play with the timer and change it.

4. __Speed__ : As the Nodejs server of the project is integrated with the **socketio**, due to the use of web sockets the response available to the user is seamlessly fast.


:star: *__Features for Bidder user__* : 

1. __Fast bid posting__ : Due to nodejs and socketIO, it posts the bid very fast.

2. __Current bid__ : Current bid price is updated as soon as any bidder posts its bids, it gives bidder to post bid so thathey get through.

3. __Bid log__ : Bid log shows into the modal in which previous bids of that particular user shows with the timestamps.


:star: *__Features for Admin__* : 

1. __Current top bidder__ : Top bidder's user id, displays into the table view of the admin panel to get notified about the status of the auction.

2. __Bid log__ : Bid log opens into the modal which shows the bids of all the bidders with the timestamps.

3. __Add product__ : Add product button opens a modal to add product with the all required details. After submission it writes to the firebase database with all the fields entered by the admin.

4. __Bidder status__ : The admin gets to knows bidder status such as Online Bidders, Bidder typing status.













