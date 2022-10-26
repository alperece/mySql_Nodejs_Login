var express = require('express');

var session = require('express-session');

var app = express();


app.use(session({
   secret: "29359897589743975kjsafklja", // unique ID as a string
   resave: false, // because some stores will delete idle (unused) sessions after some time.
   saveUninitialized: false //  the session cookie will not be set on the browser unless the session is modified. 
   // If I remove the resave and saveUninitialized config options, I get warnings to say these options are deprecated and to provide values. 
   // The docs suggest setting these config options to false in most cases
}));

//After this is done, all the requests to the app routes are now using sessions.
// secret is the only required parameter, but there are many more you can use.
// It should be a randomly unique string for your application.

app.get('/', function(req, res){
   // The session is attached to the request, so you can access it using req.session here:
   if(req.session.page_views){

      /* 
      This object can be used to get data out of the session, and also to set data:
         req.session.name = 'Flavio'
         console.log(req.session.name) // 'Flavio'
      */
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(5000);

/* 
you need a way to store user data between HTTP requests.

URL parameters are suitable ways to transport data between the client and the server.
But they are also readable on the client side. 
Sessions solve exactly this problem. 
You assign the client an ID and it makes all further requests using that ID.

So, We will need the Express-session

npm install --save express-session

The session middleware handles all things for us, 
i.e., creating the session, setting the session cookie and creating the session object in req object.

Whenever we make a request from the same client again, we will have their session information stored with us

What the above code does is, when a user visits the site, it creates a new session for the user
Next time the user comes, the page_view session variable is updated accordingly.
*/

/* 
It can store session data in

memory, not meant for production
a database like MySQL or Mongo
a memory cache like Redis or Memcached

*/

/* 
app.use(session({
  resave: false,
  saveUninitialized: false,
}))

The docs suggest setting these config options to false in most cases

depending on the value of saveUninitialized, at the end of the request, 
the session object will be stored in the session store (which is generally some sort of database)

If during the lifetime of the request the session object isn't modified then, 
at the end of the request and when saveUninitialized is false, 
the (still empty, because unmodified) session object will not be stored in the session store.


About resave: this may have to be enabled for session stores that don't support the "touch" command. 
What this does is tell the session store that a particular session is still active, 
which is necessary because some stores will delete idle (unused) sessions after some time.


If a session store driver doesn't implement the touch command, 
then you should enable resave so that even when a session wasn't changed during a request, 
it is still updated in the store (thereby marking it active)
*/


/* 
! Another popular package to manage sessions in Express is cookie-session, 
which has a big difference: it stores data client-side in the cookie. 

I do not recommend doing that because storing data in cookies means that it’s stored client-side, 
and sent back and forth in every single request made by the user. 

It’s also limited in size, as it can only store 4 kilobytes of data. 
Cookies also need to be secured, but by default they are not, 
since secure Cookies are possible on HTTPS sites 
and you need to configure them if you have proxies.
*/