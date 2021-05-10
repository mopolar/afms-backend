const mongoose = require('mongoose');

const table = mongoose.Schema({
    creation_time: Date,
    temp: Number,
    hum: Number,
    ph: Number,
    LDR: Number,
    device_number: Number
});

const Table = mongoose.model("table", table);

module.exports = Table;