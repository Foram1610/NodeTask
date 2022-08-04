const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
//const con = require('../Configuration/connection');

//autoIncrement.initialize(con);
var serviceSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    slug: { type: Number, default: 0 }
});

var model1 = mongoose.model('ServiceModel', serviceSchema, 'ServiceModel');

var entitySchema = mongoose.Schema({
    testvalue: { type: String }
});

//serviceSchema.plugin(autoIncrement.plugin,{model:'ServiceModel', field : 'slug'});

entitySchema.pre('save', function (next) {
    var slug1 = this;
    model1.findByIdAndUpdateAsync(
        { _id: 'sid' },
        { $inc: { slug: 1 } },
        { new: true, upsert: true },
        function (count) {
            //console.log('...count: '+JSON.stringify(count));
            slug1.testvalue = count.slug;
            next();
        })
});

module.exports = model1;
