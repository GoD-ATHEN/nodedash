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

app.get("/", (req, res)=>{
    res.render("dashboard");
});

//========== Login =============
app.get("/login", (req, res)=>{
    res.render("login");
});
//==============================
app.get("/loginn", (req, res)=>{

    let query = `SELECT * FROM users WHERE email = "${req.query.email}" AND pass = "${req.query.pass}"`;
    
    con.query(query, (err, result) => {
      if(err) throw err, window.location.replace("http://phenomit.com");

        if (result[0].email === `${req.query.email}` && result[0].pass === `${req.query.pass}`){
          var status = 1;
        }
        else{
          status = 0;
        }

    });

    res.render("dashboard");
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