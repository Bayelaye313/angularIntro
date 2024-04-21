const express = require('express');
var bodyParser = require('body-parser');

const db = require('./db');

const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
  const jsoncontent = {'message': 'bonjour, bayelaye'}
  res.set('Content-Type', 'application/json')
  res.send(jsoncontent)
  console.log('server params', req.params);
})

app.listen(3000);
console.log('server started on port 3000')