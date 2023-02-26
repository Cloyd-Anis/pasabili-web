require('dotenv').config();
const express=require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

const app=express();
app.use(express());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const loginRoutes = require("./routes/loginRoutes")
const employeeRoutes = require("./routes/employeeRoutes");
const customerRoutes = require("./routes/customerRoutes")
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/admin/", loginRoutes);
app.use("/admin/employees", employeeRoutes);
app.use("/admin/customers", customerRoutes);
app.use("/admin/transactions", transactionRoutes);

app.listen(8000,()=> console.log("Back end is running at port 8000"));