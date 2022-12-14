const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require("./routers/index");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, ()=>{
    console.log("Server Started on", PORT);
})

module.exports = app;