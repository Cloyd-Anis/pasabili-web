const {DataTypes} = require('sequelize');
const instance = require('../connection');
const address = require('./address').model;

const admin = instance.sequelize.define("admins",{
    admin_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    address_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    contact_no:{
        type: DataTypes.STRING,
        allowNull: true
    },
    birthday:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender:{
        type: DataTypes.ENUM('MALE','FEMALE'),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "admins"
}
);

// Define association between "admins" and "addresses"
admin.belongsTo(address, { foreignKey: 'address_id', as: 'adminAddress' }); // Adds "address_id" column to "admins" table
address.hasOne(admin, { foreignKey: 'address_id' }); // Adds "address_id" column to "addresses" table

exports.model = admin;