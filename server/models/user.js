const {DataTypes} = require('sequelize');
const instance = require('../connection');
const address = require('./address').model;
const user = instance.sequelize.define("users",{
    user_id:{
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
        allowNull: false
    },
    email_verified_at:{
        type: DataTypes.DATE,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    google_auth:{
      type: DataTypes.BOOLEAN,
      allowNull:true
    },
    user_type:{
      type: DataTypes.ENUM('ITINERANT','CUSTOMER'),
      allowNull:false
    },
    remember_token:{
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: "users"
}
);

// Define association between "users" and "addresses"
user.belongsTo(address, { foreignKey: 'address_id', as: 'userAddress' }); // Adds "address_id" column to "admins" table
address.hasOne(user, { foreignKey: 'address_id' }); // Adds "address_id" column to "addresses" table

exports.model = user;