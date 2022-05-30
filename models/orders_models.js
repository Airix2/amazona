module.exports = (sequelize, Sequelize) => {

    const Orders = sequelize.define("order", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            unique: true
        },
        user: {
            type: Sequelize.INTEGER,
        },
        orderItems: {
            type: Sequelize.JSONB,
        },
        shippingAddress: {
            type: Sequelize.JSONB,
        },
        paymentMethod: {
            type: Sequelize.STRING,
        },
        itemsPrice: {
            type: Sequelize.DECIMAL(10, 2),
        },
        shippingPrice: {
            type: Sequelize.DECIMAL(10, 2),
        },
        taxPrice: {
            type: Sequelize.DECIMAL(10, 2),
        },
        totalPrice: {
            type: Sequelize.DECIMAL(10, 2),
        },
        isPaid: {
            type: Sequelize.BOOLEAN,
        },
        isDelivered: {
            type: Sequelize.BOOLEAN,
        },
        paidAt: {
            type: Sequelize.DATE
        },
        deliveredAt: {
            type: Sequelize.DATE
        },
    }, {
        tableName: 'orders'
    }, {
        timestamps: true
    });

    return Orders;
};