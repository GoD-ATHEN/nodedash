const express = require('express');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
const ifl = path.join(__dirname, '/views/assets/')

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets',express.static(ifl));

//CONNECTION CONFIGURATION
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anoe"
   });

app.get("/dashboard", (req, res)=>{
    res.render("dashboard");
});

//========== Login =============
app.get("/login", (req, res)=>{
    res.render("login");
});
//==============================
app.get("/loginn", (req, res)=>{

    let query = `SELECT * FROM users`;
    
    con.query(query, (err, result) => {
      if(err) throw err;

      var datalen = (result.length);
      let counter = 0;
      while (counter !== datalen) {

        let results = result[counter].email.includes(`${req.query.email}`);
        let resultss = result[counter].pass.includes(`${req.query.pass}`);
        
        if(resultss && results === true){
          res.redirect('dashboard')
        }else {
          res.render('error');
        }

      counter = counter + 1;

      }

    });

});
//========== Login END ==========

//========== SIGN UP ============
app.get("/sign-up", (req, res)=>{
    res.render("sign-up");
});
//=================================
app.post('/sign-upp', urlencodedParser, (req, res) =>{
    con.query(`INSERT INTO users (name, email, pass, cpass) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.pass}', '${req.body.cpass}')`, function (err, result, fields) {
      if (err) throw err;
      res.render("login");
    });
});
//========== SIGN UP END ============

app.listen(3000);