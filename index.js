require('dotenv').config();
const dns = require('node:dns')
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
}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  try {
    const urlName = new URL(req.body.url).host;
    res.append('location', '/api/shorturl/1')
    dns.lookup(urlName, () => {
      res.send({
        'original_url': req.body.url,
        'short_url': 1
      })
      console.log(res.getHeaders())
    });
  } catch(err) {
    res.json({
      error: "Invalid URL"
    })
  }
  
  
});

app.post('/api/shorturl/1', (req, res) => {
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
