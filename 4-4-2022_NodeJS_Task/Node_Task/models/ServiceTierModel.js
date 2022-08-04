const mongoose = require('mongoose');

const serviceTierSchema = new mongoose.Schema({
    name: String,
    serviceId: {type:mongoose.Schema.Types.ObjectId,ref : 'ServiceModel'},
    description: String,
    price: Number,
});

module.exports = mongoose.model('ServiceTierModel',serviceTierSchema,'ServiceTierModel');