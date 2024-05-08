import { userRoutes } from './routers/users.route';
import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"

require('dotenv').config();
const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const useRoutes= new userRoutes()

//brancher les routes
app.use('/utilisateurs',useRoutes.router)

app.listen(process.env.PORT || 3600);
console.log('server started on port'+process.env.PORT || 3600)