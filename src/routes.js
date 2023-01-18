var express = require('express');
var router = express.Router();
//const dbConn  = require('../lib/db');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
//const { v4: uuidv4 } = require('uuid');



//src kansiosta node routes.js lähtee käyntiin http://localhost:5000/restaurant näkee hard koodatut ravintolat

const dbConn = mysql.createPool({
  host:'localhost',
	user:'fooduser',
	password:'foodpass',
	database:'food4u',
  acquireTimeout: 1000,
  connectionLimit: 100
});


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
app.use(passport.initialize());

//create a secret key for jwt
let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
  jwtSecretKey = require('./jwt-key.json').secret;
} else {
  jwtSecretKey = process.env.JWTKEY;
}
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
      let options = {}
      options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

      /* This is the secret signing key.
         You should NEVER store it in code  */
      options.secretOrKey = jwtSecretKey;
      
      passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);
        /* Here you could do some processing based on the JWT payload.
        For example check if the key is still valid based on expires property.
        */
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
          done(null, jwt_payload);
        }
        else {// expired
          done(null, false);
        }
      }));



app.post("/login", (req, res)=> {
 const user = req.body.username
 const password = req.body.password
 dbConn.getConnection ( async (err, connection)=> {
if (err) throw (err)
//perform a sql search with given username to get specific data for the username
    const sqlSearch = "Select * from user where username = ?"
    const search_query = mysql.format(sqlSearch,[user])
    console.log(search_query)
     dbConn.query(search_query, async (err, result) => {
       console.log(result)
       connection.release(); 
    if (err)
      throw (err);
      //check if the given username exist
    if (result.length == 0) {
      console.log("User does not exist");
      res.sendStatus(404);
    }
    else {
      const passwordHash = result[0].password;
      //get the passwordHash from result and compare if the password is correct
      if (await bcrypt.compare(password, passwordHash)) {
        console.log("Login Successful");
        console.log("Generating accessToken");
        // res.json({
        //   token: jwt.sign({ username: result[0].username, isOwner: result[0].isOwner }, jwtSecretKey, { expiresIn: "2h" }
          
        // )})
        //});
          //with jwt.sign we create the jsonwebtoken, payload has values idUser, username and isOwner
        jwt.sign({ idUser: result[0].idUser, username: result[0].username, isOwner: result[0].isOwner }, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
          res.json({ token });  
          console.log(token)
        });   

      } else {
        console.log("Password Incorrect");
        res.send("Password incorrect!");
      }//console.log(jwt)
    }
  }) 
}) 
}) 

// Get all restaurants from the database
app.get('/restaurant', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM restaurant', function (error, results) {
    if (error) throw error;
    console.log("Ravintolat haettu");
    res.send(results)
  });
});
});


// get all menulist items
app.get('/menuitem', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM menuitem', function (error, results) {
    if (error) throw error;
    console.log("Menu haettu");
    res.send(results)
  });
});
});

app.get('/delete/:idMenuItem', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('DELETE FROM menuitem where idMenuItem=?',[req.params.idMenuItem], function (error, results) {
    if (error) throw error;
    console.log("Annos tuhottu");
    res.send(results)
  });
});
});

// get all user information
app.get('/userinfo/:idUser', function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT * FROM user where idUser=?', [req.params.idUser], function (error, results) {
    if (error) throw error;
    console.log("Käyttäjätiedot haettu");
    res.send(results)
  });
});
});

// Get one restaurant from database with idRestaurant
app.get(`/restaurant/:idRestaurant/restaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM restaurant WHERE idRestaurant=?',[req.params.idRestaurant], function(error, result) {
      if (error) throw error;
      console.log("Ravintola haettu");     
      res.send(result)  
    });
  });   
});

// Get restaurants of owner from database with idUser
app.get(`/myrestaurants/:idUser`, function(req, res) {
 
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM restaurant WHERE idUser=?',[req.params.idUser], function(error, result) {
      if (error) throw error;
      console.log("Omistajan ravintolat haettu");     
      res.send(result)  
    });
  });   
});

// Add new restaurant to the database, only with value 1 from isOwner checked with token is able to add
app.post(`/addrestaurant`, passport.authenticate('jwt', { session: false }),
 function(req, res) {
  if (req.user.isOwner != 1){
    res.sendStatus(403); 
    return
  }
  dbConn.getConnection(function (err, connection) {
    
    dbConn.query('INSERT INTO restaurant (name, type, pricerange, address, openingHours, restaurantImg, idUser) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.body.name, req.body.type, req.body.pricerange, req.body.address, req.body.openingHours, req.body.restaurantImg, req.body.idUser],
     function(error, result) {
      if (error) throw error;
      console.log("Ravintola lisätty");
      res.send(result)  
      
    });
  });   
});


// Add menuitems for selected restaurant
app.post(`/menuitem/:idRestaurant`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('INSERT INTO menuitem (dish, name, description, price, menuItemImg, idRestaurant) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.dish, req.body.name, req.body.description, req.body.price, req.body.menuItemImg, req.params.idRestaurant],
     function(error, result) {
      if (error) throw error;
      console.log("Annos lisätty");
      res.send(result)  
    });
  });   
});

// Get menuitems from one restaurant with idRestaurant
app.get(`/restaurant/:idRestaurant/menu`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    dbConn.query('SELECT * FROM menuitem where idRestaurant=?',[req.params.idRestaurant], function(error, result) {
     // dbConn.query('SELECT * FROM menuitem', function(error, result) {
        if (error) throw error;
        console.log("Ruokalista haettu");
        res.send(result)  
      });
    });   
});

// Add new user, password is saved with bcrypt hash
app.post(`/user`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    
    const salt = bcrypt.genSaltSync(6);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
    dbConn.query('INSERT INTO user (username, password, fname, lname, address, isOwner) VALUES (?, ?, ?, ?, ?, ?)',
    [ req.body.username, passwordHash, req.body.fname, req.body.lname, req.body.address, req.body.isOwner],
     function(error, result) {
      if (error) throw error;
      console.log("Käyttäjä luotu");
      res.send(result) 

    });
  });   
});

// get all menulist items
app.get(`/orders/:idUser`, function (req, res) {
  dbConn.getConnection(function (err, connection) {
      dbConn.query('SELECT price, address, idUser, restaurant, date_format(orderTime,"%d.%m.%Y : %H.%i.%s") as orderTime FROM ordercontent where idUser=?', [req.params.idUser], function (error, results) {
    if (error) throw error;
    console.log("Menu haettu");
    res.send(results)
  });
});
});

// Add new order to the database
app.post("/order/:idUser", function(req, res) {
  dbConn.getConnection(function (err, connection) {
    
    dbConn.query('INSERT INTO ordercontent (amount, price, address, idUser, restaurant) VALUES (?, ?, ?, ?, ?)',
    [req.body.amount, req.body.price, req.body.address, req.body.idUser, req.body.restaurant],
     function(error, result) {
      if (error) throw error;
      console.log("Ostos lisätty");
      res.send(result)  
      
    });
  });   
});

// 5000 the port that we are listening
 app.listen(5000, () => {
     console.log('check http://localhost:5000/register to see the data.');
});