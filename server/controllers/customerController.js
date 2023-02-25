
require('dotenv').config("./.env");
const admin = require("../models/admin");
const user = require("../models/user");
const address = require("../models/address");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op, Sequelize } = require('sequelize');
var moment = require('moment');
const { generateAdminAccessToken } = require('../helpers/generateAdminAccessToken');

exports.getAllCustomers = async (req, res) => {
    // Get all active customers with their addresses
    let customers = await user.model.findAll({
        order: [['createdAt', 'DESC']], // Order by creation date in descending order
        where: {
            user_type: "CUSTOMER",
            status: true // Only get customers with status set to true
        },
        include: [{
            model: address.model, as: "userAddress" // Include the customers address using the alias "userAddress"
        }]
    })

    // Get all inactive itinerants with their addresses
    let inactiveCustomers = await user.model.findAll({
        where: {
            user_type: "CUSTOMER", // Only get itinerants
            status: false // Only get inactive itinerants
        },
        include: [{
            model: address.model, as: "userAddress" // Include the customers address using the alias "userAddress"
        }]
    })

    // Return the results
    res.send({ success: true, data: { customers: customers, inactiveCustomers: inactiveCustomers} });
}


// deactivates admin it checks whether the password is equal to the password inputted in the modal
exports.deactivateCustomer = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        
        const userRecord = await user.model.findOne({
            where: {
                user_type: "CUSTOMER",
                email: req.body.email
            }
        });
        if (userRecord && originalText === req.body.password) {
            await user.model.update({ status: false }, {
                where: {
                    email: req.body.email
                }
            })
            res.send({ success: true, message: "Successfully deactivated customer." });
        } else {
            res.send({ success: false, message: "Invalid email or password", data: null });
        }
    })

}


exports.reactivateCustomer = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        const userRecord = await user.model.findOne({
            where: {
                user_type: "CUSTOMER",
                email: req.body.email
            }
        });
        if (userRecord && originalText === req.body.password) {
            await user.model.update({ status: true }, {
                where: {
                    email: req.body.email
                }
            })
            res.send({ success: true, message: "Successfully reactivated customer." });
        } else {
            res.send({ success: false, message: "Invalid email or password", data: null });
        }
    })

}


