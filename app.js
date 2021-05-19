var express = require('express');
const logger = require('morgan');
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')

var app = express();

db.sync();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/users/:userId/games', game);
app.listen(4000, function() {
    console.log("App is listening on 4000");
})