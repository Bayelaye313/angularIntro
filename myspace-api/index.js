const express = require('express');
var bodyParser = require('body-parser');

const db = require('./db');

const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/utilisateurs', function (req, res) {
  db.all("SELECT * FROM users", function(err, rows){
    console.log('rows', rows);
    res.set('Content-Type', 'application/json');
    res.set('server', 'Myspace Server')
    res.send(rows)  
  })
})
app.post('/utilisateurs', function (req, res) {
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


app.listen(3000);
console.log('server started on port 3000')