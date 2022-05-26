module.exports = (sequelize, Sequelize) => {

    const Products = sequelize.define("product", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
        },
        slug: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
        },
        brand: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.DECIMAL(10, 2),
        },
        numReviews: {
            type: Sequelize.DECIMAL(10, 2),
        },
        countInStock: {
            type: Sequelize.DECIMAL(10, 2),
        },
        description: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'products'
    }, {
        timestamps: true
    });

    return Products;
};