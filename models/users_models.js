module.exports = (sequelize, Sequelize) => {

    const Users = sequelize.define("user", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        isAdmin: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'users'
    }, {
        timestamps: true
    });

    return Users;
};