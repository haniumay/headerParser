// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// trust the proxy (Render) so the real client IP is available
app.set('trust proxy', true);

// enable CORS so freeCodeCamp can test your API
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// sample endpoint from the boilerplate
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// request header parser endpoint
app.get("/api/whoami", function (req, res) {
  const forwarded = req.headers['x-forwarded-for'];
  const ipaddress = forwarded ? forwarded.split(',')[0].trim() : req.ip;

  res.json({
    ipaddress: ipaddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
