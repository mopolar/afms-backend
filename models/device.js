const mongoose = require('mongoose');

const Device = mongoose.model('Device', {
    device_number: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = Device