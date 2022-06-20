const express = require("express");
const app = express();
const cors = require('cors');
const { use } = require("./routes/filmesRoutes");

app.use(express.json())
app.use(cors())






module.exports = app