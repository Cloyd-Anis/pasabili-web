
require('dotenv').config("./.env");
const admin = require("../models/admin");
const transaction = require("../models/transaction");
const order = require("../models/order")
const user = require("../models/user");
const address = require("../models/address");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op, Sequelize } = require('sequelize');


exports.getAllTransactions = async (req, res) => {

    let transactions = await transaction.model.findAll({
        order: [['createdAt', 'DESC']], // Order by creation date in descending order
        where: {
            deletedAt : null
        },
        include: [{
            model: order.model, as: "transactionOrders" ,
            include:[{
                model: user.model, as: "customer"
            }, {
                model: user.model, as: "itinerant"
            }, {
                model: address.model, as: "pickup_address"
            }, {
                model: address.model, as : "dropoff_address"
            }]
        }]
    })

    // Return the results
    res.send({ success: true, data: { transactions: transactions} });
}