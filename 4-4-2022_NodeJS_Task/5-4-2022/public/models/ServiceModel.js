const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const con = require('../../bin/connection');

autoIncrement.initialize(con);
const serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    slug: { type: mongoose.Schema.Types.ObjectId, ref: 'Slug' }
});

serviceSchema.plugin(autoIncrement.plugin, { model: 'ServiceModel', field: 'slug' });
module.exports = mongoose.model('ServiceModel', serviceSchema, 'ServiceModel');

