var path = require('path')
var bodyParser = require('body-parser')
var request = require('request')
var express = require('express')
var cookierParser = require('cookie-parser')
var session = require('express-session')
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect(
  process.env.DB,
  (e, database) => {
    if (e) {
      console.log('error connecting to db!')
      console.log(e)
    }
    console.log('connected to db')
    db = database
})

var app = express()

app.set('port', process.env.PORT || 7022)

app.set('views', './views')

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(require('cookie-parser')('keyboard cat'))
app.use(require('cookie-session')({
  keys: ['key1', 'key2']
}))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))

// get the flips
app.get('/api/getflips', (req, res) => {
  let url = req.query.url
  let site = {}

  db.collection('sites').findOne({
    'url': url
  }, (err, doc) => {
    if (doc) {
      site = doc
      console.log('site with url ' + url + ' found')
      res.json({ 'flips': site.flips })
    } else {
      console.log('site not found in db... adding')
      // add new site with flip
      let newSite = {
        flips: 0,
        url: url
      }

      // add new site to the db init'd with 0 flips
      db.collection('sites').save(newSite, (e, result) => {
        if (e) {
          console.log(e)
          res.status(500).send('Error creating new site entry!')
        } else {
          console.log('new site added successfully to sites db')
          res.json({ 'flips': 0 })
        }
      })
    }
  })
})

// flip a site
app.post('/api/flip', (req, res) => {
  let url = req.body.url
  let site = {
    url: url
  }

  db.collection('sites').findOne({
    'url': url
  }, (err, doc) => {
    if (doc) {
      console.log('site with url ' + url + ' found')

      let newSite = doc
      newSite.flips++;

      // update site with incremented flips
      db.collection('sites').updateOne(site, newSite, (e, result) => {
        if (e) {
          console.log(e)
          res.status(500).send('Error incrementing flip!')
        } else {
          res.json({ 'flips': newSite.flips })
        }
      })
    } else {
      console.log('site not found in db... adding')
      // add new site with flip
      let newSite = {
        flips: 1,
        url: url
      }

      // add new site to the db init'd with 1 flip
      db.collection('sites').save(newSite, (e, result) => {
        if (e) {
          console.log(e)
          res.status(500).send('Error creating new site entry!')
        } else {
          console.log('new site added successfully to sites db')
          res.json({ 'flips': 1 })
        }
      })
    }
  })
})

app.get('/test', (req, res) => {
  request({
    url: 'http://localhost:7022/api/getflips',
    method: 'GET',
    qs: {
      url: 'test.com/article'
    }
  }, function(error, response, body) {
    body = JSON.parse(body)
    res.send('<h1> test.com/article: ' + body.flips + '  </h1>')
  })
})

app.get('/test2', (req, res) => {
  request({
    uri: 'http://localhost:7022/api/flip',
    method: 'POST',
    json: {
      url: 'test.com/article'
    }
  }, function(error, response, body) {
    res.send('<h1> test.com/article: ' + body.flips + '  </h1>')
  })
})

// redirect everything else to index so react-router can manage
// routing
app.get('*', (req, res) => {
  res.render('index', { user: req.user })
})

app.listen(app.get('port'), () => {
  console.log('server started on port ' + app.get('port'))
})
