const mongoose = require('mongoose');

const table = mongoose.Schema({
    creation_time: Date,
    temp: String,
    hum: String,
    ph: String,
    LDR: String,
    device_number: String
});

const Table = mongoose.model("table", table);

module.exports = Table;