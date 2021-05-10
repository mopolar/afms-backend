const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const db = require("./db/db")
const header_middleware = require("./middlewares/header")

const userRoutes = require("./Routes/user");
const tableRoutes = require("./Routes/table");



var cors = require('cors');

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json())
app.use(header_middleware)
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));

app.use("/api/user", userRoutes);
app.use("/api/table",tableRoutes);


app.get('/test', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`)
})