/**
 * Created by xoxoumop3pisdn on 5/19/17.
 */
console.log("I am a server js file");

// server now starts to listen on port 3000
var express = require('express');
var app = express();

// need to tell server look at this folder to retrieve html
app.use(express.static(__dirname+'/public_two')); // go to public_two to find html

var ipaddress = '127.0.0.1'; // local ip address always this one (localHost DNS)
var  port = process.env.PORT || 3000; // b/c not reserved
// if push to heruko.. I listen to either heruko port or my local post 3000;

app.listen(port, ipaddress);
