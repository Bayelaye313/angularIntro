const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const db = require('./db');


const userRoute = require('./routers/users.route');
const messageRoute = require('./routers/message.route');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//brancher les routes
app.use('/utilisateurs',userRoute)
app.use('/message',messageRoute)


app.listen(3000);
console.log('server started on port 3000')