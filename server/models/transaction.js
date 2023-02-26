const {DataTypes} = require('sequelize');
const instance = require('../connection');
const order = require('./order').model;

const transaction = instance.sequelize.define("transactions",{
    transaction_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    order_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    amount:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method:{
      type: DataTypes.ENUM('PAYPAL'),
      allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt:true,
    deletedAt: true,
    tableName: "transactions"
}

);
// Define association between "transaction" and "order"
transaction.belongsTo(order, {foreignKey: 'order_id', as: 'transactionOrders'});
order.hasMany(transaction, {foreignKey: 'order_id' }); 
exports.model = transaction;