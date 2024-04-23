import express from 'express';
import bodyParser from 'body-parser';
import router from './routers/users.route';
require('dotenv').config();
const app = express();


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//brancher les routes
app.use('/utilisateurs',router)

app.listen(process.env.PORT || 3000);
console.log('server started on port'+process.env.PORT || 3000)