const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/static/:filename/', function(req, res) {
  res.sendFile(path.join(__dirname, 'static',req.params.filename));
})

app.get('/', function (req, res) {
  const htmlcontent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello Abdoulaye</h1>
</body>
</html>
  `
  const jsoncontent = {'message': 'bonjour, abdoulaye'}
  res.set('Content-Type', 'application/json')
  res.send(jsoncontent)
  console.log('server params', req.params);
})

app.listen(3000);
console.log('server started on port 3000')