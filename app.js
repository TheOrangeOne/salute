var path = require('path');
var express = require('express');
var cookierParser = require('cookie-parser');
var session = require('express-session');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect(
  process.env.DB,
  (e, database) => {
    if (e) {
      console.log('error connecting to db!');
      console.log(e);
    }
    console.log('connected to db');
    db = database;
})

var app = express();

app.set('port', process.env.PORT || 7022);

app.set('views', './views');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')('keyboard cat'));
app.use(require('cookie-session')({
  keys: ['key1', 'key2']
}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));


// redirect everything else to index so react-router can manage
// routing
app.get('*', (req, res) => {
  res.render('index', { user: req.user });
});

app.listen(app.get('port'), () => {
  console.log('server started on port ' + app.get('port'));
});
