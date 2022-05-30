const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },

    logging: false
});

const db = {};

/* -------------------------------------------------------------------------- */
/*                  Add Database To SYNC with MYSQL Database                  */
/* -------------------------------------------------------------------------- */

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products_models")(sequelize, Sequelize);
db.users = require("./users_models")(sequelize, Sequelize);
db.orders = require("./orders_models")(sequelize, Sequelize);

module.exports = db;