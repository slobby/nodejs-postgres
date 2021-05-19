const express = require('express');
const logger = require('morgan');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

const app = express();

db.sync();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));

app.use('/api/users/:userId/games', game);
app.listen(4000, () => {
  console.log('App is listening on 4000');
});
