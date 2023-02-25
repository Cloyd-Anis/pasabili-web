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

exports.login = async (req, res) => {
    let data = await admin.model.findOne({
        where: {
            email: req.body.email,
            status: true
        }
    })
    if (data !== null) {
        var bytes = C.AES.decrypt(data.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if (originalText === req.body.password && data.password != "") {
            const accessToken = generateAdminAccessToken(data);
            res.send({ success: true, message: "Login Successful!", data: data, accessToken })
        } else {
            res.send({ success: false, message: "The credentials provided does not match." });
        }
    } else {
        res.send({ success: false, message: "Account not found." });
    }
}

exports.logout = async (req, res) => {
    res.status(200).json("You logged out Successfully");
}
