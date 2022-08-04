const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    zipcode: Number,
    state: String,
    country: String,
    paymentMode: String,
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceModel' },
    serviceTierId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceTierModel' },
});

module.exports = mongoose.model('UserServiceModel', userServiceSchema, 'UserServiceModel');