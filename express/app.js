const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require("http");
const server = http.createServer(app);

server.listen(3000, function() {
    console.log("Listening on PORT 3000");
});

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(25340230000000)
      }
}));
app.use(express.static("bootstrap"));

