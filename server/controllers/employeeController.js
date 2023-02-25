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

exports.registerAdmin = async (req, res) => {
    let data = await admin.model.findAll({
        where: {
            email: req.body.email
        }
    })

    if (data.length === 0) {
        req.body.password = "p@ssw0rd";
        var hash = C.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        req.body.password = hash;
        let admin_address = await address.model.create({
            street: req.body.street,
            barangay: req.body.barangay,
            town: req.body.town,
            postal_code: req.body.postal_code
        });
       
        await admin.model.create({
            address_id: admin_address.address_id,
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password,
            contact_no: req.body.contact,
            status: req.body.status
        });
        res.send({ success: true, message: "Successfully Register!" });
    } else {
        res.send({ success: false, message: "Account already exist!" });
    }

}

exports.getAllAdminAndItinerant = async (req, res) => {
    // Get all active admins with their addresses
    let admins = await admin.model.findAll({
        order: [['createdAt', 'DESC']], // Order by creation date in descending order
        where: {
            status: true // Only get admins with status set to true
        },
        include: [{
            model: address.model, as: "adminAddress" // Include the admin's address using the alias "adminAddress"
        }]
    })

    // Get all active itinerants with their addresses
    let itinerants = await user.model.findAll({
        where: {
            user_type: "ITINERANT", // Only get itinerants
            status: true // Only get active itinerants
        },
        include: [{
            model: address.model, as: "userAddress" // Include the itinerant's address using the alias "userAddress"
        }]
    })

    // Get all inactive itinerants with their addresses
    let inactiveItinerants = await user.model.findAll({
        where: {
            user_type: "ITINERANT", // Only get itinerants
            status: false // Only get inactive itinerants
        },
        include: [{
            model: address.model, as: "userAddress" // Include the itinerant's address using the alias "userAddress"
        }]
    })

    // Get all inactive admins with their addresses
    let inactiveAdmins = await admin.model.findAll({
        where: {
            status: false // Only get inactive admins
        },
        include: [{
            model: address.model, as: "adminAddress" // Include the admin's address using the alias "adminAddress"
        }]
    })

    // Combine inactive itinerants and inactive admins into one array
    const inactives = [...inactiveItinerants, ...inactiveAdmins];

    // Return the results
    res.send({ success: true, data: { admins: admins, itinerants: itinerants, inactives: inactives } });
}


// deactivates admin it checks whether the password is equal to the password inputted in the modal
exports.deactivateEmployee = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
       
        const adminRecord = await admin.model.findOne({
            where: {
                email: req.body.email
            }
        });
        if (adminRecord && originalText === req.body.password) {
            await admin.model.update({ status: false }, {
                where: {
                    email: req.body.email
                }
            })
            res.send({ success: true, message: "Successfully deactivated admin." });
        } else {
            const userRecord = await user.model.findOne({
                where: {
                    user_type: "ITINERANT",
                    email: req.body.email
                }
            });
            if (userRecord && originalText === req.body.password) {
                await user.model.update({ status: false }, {
                    where: {
                        email: req.body.email
                    }
                })
                res.send({ success: true, message: "Successfully deactivated Itinerant." });
            } else {
                res.send({ success: false, message: "Invalid email or password", data: null });
            }
        }
    })

}


exports.reactivateEmployee = async (req, res) => {
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        // If JWT contains an admin ID
        var decodedData = JSON.parse(decoded.admin_id);
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);

        const adminRecord = await admin.model.findOne({
            where: {
                email: req.body.email
            }
        });
        if (adminRecord && originalText === req.body.password) {
            await admin.model.update({ status: true }, {
                where: {
                    email: req.body.email
                }
            })
            res.send({ success: true, message: "Successfully reactivated admin." });
        } else {
            const userRecord = await user.model.findOne({
                where: {
                    user_type: "ITINERANT",
                    email: req.body.email
                }
            });
            if (userRecord && originalText === req.body.password) {
                await user.model.update({ status: true }, {
                    where: {
                        email: req.body.email
                    }
                })
                res.send({ success: true, message: "Successfully reactivated Itinerant." });
            } else {
                res.send({ success: false, message: "Invalid email or password", data: null });
            }
        }

    })

}


