const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb+srv://m_gamal:polar147@task.npwty.azure.mongodb.net/automation_trial?retryWrites=true&w=majority'

let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
