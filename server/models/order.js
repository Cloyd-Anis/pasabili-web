const {DataTypes} = require('sequelize');
const instance = require('../connection');
const user = require('./user').model;
const address = require('./address').model;
const order = instance.sequelize.define("orders",{
    order_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    customer_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    itinerant_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    pickup_address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    dropoff_address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    order_status:{
        type: DataTypes.ENUM('PENDING', 'IN PROGRESS', 'COMPLETED'),
        allowNull:false
    },

},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "orders"
}

);

// Define the associations
order.belongsTo(user, { foreignKey: 'customer_id', as: 'customer' });
order.belongsTo(user, { foreignKey: 'itinerant_id', as: 'itinerant' });
order.belongsTo(address, { foreignKey: 'pickup_address_id', as: 'pickup_address' });
order.belongsTo(address, { foreignKey: 'dropoff_address_id', as: 'dropoff_address' });

exports.model = order;