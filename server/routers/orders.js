const express = require("express");
const router = express.Router();
const {create, assign, history, createShipment, transportShipment, receiveShipment} = require("../controllers/orders");

const authMiddleware = require("../middlewares/auth");
const checkAdminMiddleware = require("../middlewares/checkAdmin");

router.use("/", authMiddleware);

router.post('/create', create);
router.post('/assign', assign);
router.get('/history', history);
router.post('/create-shipment', createShipment);
router.post('/transport-shipment', transportShipment);
router.post('/receive-shipment', receiveShipment);

module.exports =  router;