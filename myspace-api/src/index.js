const express = require('express');
var bodyParser = require('body-parser');

const userRoute = require('./routers/users.route');
const messageRoute = require('./routers/message.route');
const app = express();

require('dotenv').config();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//brancher les routes
app.use('/utilisateurs',userRoute)
app.use('/messages',messageRoute)


app.listen(process.env.PORT || 3000);
console.log('server started on port'+process.env.PORT || 3000)