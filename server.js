const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");

//EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.json());

//JWT-SECRET
const JWT_Secret = "p4s5w0rd";

//DATA LOGIN
var testUser = { email: "sebastian@gmail.com", password: "1234567" };

//ROUTE
app.post("/api/authenticate", (req, res) => {
  if (req.body) {
    var user = req.body;
    console.log(user);

    if (
      testUser.email === req.body.email &&
      testUser.password === req.body.password
    ) {
      var token = jwt.sign(user, JWT_Secret);
    //   console.log(token);
      res.status(200).send({
        signed_user: user,
        token: token,
      });
    } else {
      res.status(403).send({
        errorMessage: "Authorisation required!",
      });
    }
  } else {
    res.status(403).send({
      errorMessage: "Please provide email and password",
    });
  }
});

//SERVER
app.listen(5000, () => console.log('Server started on port 5000'));

//! https://code.tutsplus.com/es/tutorials/jwt-authentication-in-angular--cms-32006