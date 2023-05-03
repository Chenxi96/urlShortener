require('dotenv').config();
const dns = require('node:dns');
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;


app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.post('/api/shorturl', (req, res) => {
  try {
    const url = new URL(req.body.url).hostname;
    dns.lookup(url, (err, address) => {
      res.json({
        original_url: req.body.url,
        short_url: 1
      });
    })
  } catch {
    res.json({
      error: "Invalid URL"
    })
  }
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
