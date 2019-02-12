var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./Models/User');

var app = express();
app.set('port', 3000);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Session

//Cookies

//Session checker

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.route('/login').get((req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.route('/blank').get((req, res) => {
    res.sendFile(__dirname + '/public/blank.html')
})

app.route('/loggedIn').get((req, res) => {
    res.sendFile(__dirname + '/public/loggedI.html')
})

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));