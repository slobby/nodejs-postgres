const Sequelize = require('sequelize');
require('dotenv').config();

                                // database username   password
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 5433,
    dialect: 'postgres',
    operatorsAliases: false
})

sequelize.authenticate().then(
    () => {
        console.log("Connected to DB");
    },

    (err) => {
        console.log(`Error: ${err}`);
    }
)

module.exports = sequelize;