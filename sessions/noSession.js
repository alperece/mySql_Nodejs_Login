var express = require('express');

//var session = require('express-session');

var app = express();


//app.use(session({secret: "Shh, its a secret!"}));

let  page_views = 0;

app.get('/', function(req, res){

   if(page_views){
      page_views++;
      res.send("You visited this page " + page_views + " times");
   } else {
      page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

app.listen(5000);