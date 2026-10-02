// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// timestamp endpoint
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // empty parameter: current time
    parsedDate = new Date();
  } else if (/^-?\d+$/.test(date)) {
    // only digits: treat as a Unix timestamp in milliseconds
    parsedDate = new Date(parseInt(date, 10));
  } else {
    // any other string: let Date parse it
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});