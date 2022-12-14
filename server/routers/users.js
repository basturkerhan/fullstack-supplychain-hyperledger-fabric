const express = require("express");
const router = express.Router();
const {login, register} = require("../controllers/users");

const authMiddleware = require("../middlewares/auth");
const checkAdminMiddleware = require("../middlewares/checkAdmin");

router.post('/login', login);
router.post('/register', authMiddleware, checkAdminMiddleware, register);

module.exports =  router;