const express = require('express');
const router = express.Router();
const db = require('../db');
const paramRoute = require('./parameter.route');


router.get('/', function (req, res) {
    db.all("SELECT * FROM users", function(err, rows){
      console.log('rows', rows);
      res.set('Content-Type', 'application/json');
      res.set('server', 'Myspace Server')
      res.send(rows)  
    })
  })
  router.use('/:id/parametres', paramRoute)
  router.get('/:id', (req,res)=>{
    res.send('user'+req.params.id)
  })
  router.post('/', function (req, res) {
    const data = req.body;
    const jsonusers = data;
  
    //requete prepare
    /*const stmt = db.prepare("insert into users(firstname, lastname, login, password) values(?,?,?,?)");
    const stmt_query_val = (data.firstname+" " +data.lastname+" " +data.login+" " +data.password)
    console.log('stmtval: ',stmt_query_val);
    stmt.run(stmt_query_val);
    stmt.finalize();*/
    //using exec
    const sql =(`insert into users(firstname, lastname, login, password) values("${data.firstname}", "${data.lastname}", "${data.login}", "${data.password}")`)
    db.exec(sql)
    //reponse
    res.set('Content-Type', 'application/json')
    res.set('server', 'Myspace Server')
    res.send(jsonusers)
  })
  module.exports = router;