const mongoose = require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/NodeTask_DB')
.then(() => console.log('MongoDB Connected!!'))

module.exports = mongoose;