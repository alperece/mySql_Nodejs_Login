var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'alper',
	password : '654321',
	database : 'fbw10'
});

var app = express();

app.use(session({
	secret: 'secret', // unique ID as a string
    resave: false, // to store idle (unused) sessions after some time and update it.
    saveUninitialized: false //  the session cookie will be set on the browser when the session is modified. 
    
    // If I remove the resave and saveUninitialized config options, I get warnings to say these options are deprecated and to provide values. 
   // The docs suggest setting these config options to false in most cases
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/welcome', function(request, response) {
	response.sendFile(path.join(__dirname + '/welcome.html'));
});

/* app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
        
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
 */

app.post('/auth', function(request, response) {

    // body-parser will parse the username and password from form
	var username = request.body.username;
    var password = request.body.password;
    
	if (username && password) {

        // ! connection: Defined database connection informations's variable!
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {

            //console.log(results); // match id, username, password, email data in DB
            //console.log(fields); // field data for each column for id, username, password, email in DB
            console.log(results.length); // we have one match username and password. That's why, results.length is 1. Bigger than 0

			if (results.length > 0) {

				request.session.loggedin = true;
                request.session.username = username;
                request.session.password = password;
                response.redirect('/welcome');
             
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	}/*  else {
		response.send('Please enter Username and Password!');
		response.end();
	} */
});


app.listen(7050);