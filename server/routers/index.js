const express = require("express");
const orders = require("./orders");
const users = require("./users");

const router = express.Router();

router.get('/', function(req, res) {
    res.send('Express Routers');
});

router.use('/orders', orders);
router.use('/users', users);

module.exports =  router;