# Debug in Node.js


This is an aplication, for testing REST API and interactions with Postgres
Data Base.

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/slobby/nodejs-postgres.git -b develop
```

## Installing NPM modules

```
npm install
```

create a ".env" file in the root directory, with the following content

```
DB_HOST=databasehost
DB=database
DB_USER=databaseuser
DB_PASSWORD=databasepassword
DB_PORT=5433
```


## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open in Postman the next link \
https://www.getpostman.com/collections/32e230b2adcb58a47038
and chek all endpoints for this app.

## What have been done

### Founded compilation mistakes:

| # |Error description|Fix description|File path|String number              |
|:-:|:-----------------------|:----------|:-------|---------------|
| 1 |var router = Router();   | const router = require('express').Router(); | \controllers\usercontroller.js|1|
| 2 |var bcrypt = require('bcrypt');| const bcrypt = require('bcryptjs'); | \controllers\usercontroller.js | 2|
| 3 |var User = require('../db').import('../models/user');|const User = require('../models/user');|\controllers\usercontroller.js |5|
|4|var Game = require('../db').import('../models/game');| const Game = require('../models/game');|\controllers\gamecontroller.js|2|
|5|module.exports = routers;|module.exports = router;|\controllers\gamecontroller.js|116|
|6|function(sequelize, DataTypes) {|module.exports = function(sequelize, DataTypes) {|\models\game.js|1|
|7|var User = require('sequelize').import('../models/user');|const User = require('../models/user');|\middleware\validate-session.js|2|
|8|app.use(require('body-parser'));|app.use(express.urlencoded({ extended: true }));app.use(express.json());|\app.js|11, 12|

### Founded app logical mistakes:

| # |Error description|Fix description|File path|String number              |
|:-:|:-----------------------|:----------|:-------|---------------|
|1|app.listen(function() {|app.listen(4000, function() {|\app.js|16|
|2|-|    process.env.DB_PORT,|\db.js|7|
|3|passwordhash: bcrypt.hashSync(req.body.user.password, 10),|passwordHash: bcrypt.hashSync(req.body.user.password, 10),|\controllers\usercontroller.js|11|
|3|module.exports = function(sequelize, DataTypes) { return sequelize.define('game', {|const { DataTypes } = require("sequelize");const db = require('./../db');module.exports = db.define('game', {|\models\game.js|1-4|
|4|module.exports = function(sequelize, DataTypes) { return sequelize.define('user', {|const { DataTypes } = require("sequelize");const db = require('./../db'); module.exports = db.define('user', {|\models\user.js|1-4|
|5|Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })|Game.findOne({ where: { id: req.params.id, owner_id: req.body.user.id } })|\controllers\gamecontroller.js|23|
|6|function findSuccess(data) {|function findSuccess(games) {|\controllers\gamecontroller.js|7|
|7|owner_id: req.body.game.user.id,|owner_id: req.body.user.id,|\controllers\gamecontroller.js|42|
|8|Game.findAll({ where: { owner_id: req.user.id } })|Game.findAll({ where: { owner_id: req.body.user.id } })|\controllers\gamecontroller.js|5|
|9|owner_id: req.user|owner_id: req.body.user.id|\controllers\gamecontroller.js|73|
|10|app.use('/api/game', game);|app.use('/api/users/:userId/games', game);|\app.js|15|
|11|const router = require('express').Router();|const router = require('express').Router({mergeParams : true});|\controllers\gamecontroller.js|1|
|12|req.body.user.id|req.params.userId|\controllers\gamecontroller.js|5,|







If the "input file" and/or "output file" are ommited, then reading and/or writing \
will be carried out from/to the command line.

To interrupt the process, in that case, press "ctrl+C".

---

## Examples

Usage example:

1. **-a (--action**) is encode

`$ node caesar-cipher -a encode -s 7 -i "./input.txt" -o "./output.txt"`

>input.txt `This is secret. Message about "_" symbol!`

>output.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

`$ node caesar-cipher --action encode --shift 7 --input plain.txt --output encoded.txt`

>plain.txt `This is secret. Message about "_" symbol!`

>encoded.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. **-a (--action)** is decode
Decoding encoded initial string with the same -s(--shift) number produces the initial string.

`$ node caesar-cipher --action decode --shift 7 --input encoded.txt --output plain.txt`

>encoded.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

>plain.txt `This is secret. Message about "_" symbol!`

3. Negative shift handling

`$ node caesar-cipher --action encode --shift -1 --input plain.txt --output encoded.txt`

>plain.txt `This is secret. Message about "_" symbol!`

>encoded.txt Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!


## Project structure

- - js - (folder with pure "js" files)
 |
  - src - ( source folder for "ts" files )
 |
  - dist - ( output folder for generated "js" files from "ts")

To get "js" files in folder "dist" just go to project home directory and enter "tsc" in command line.