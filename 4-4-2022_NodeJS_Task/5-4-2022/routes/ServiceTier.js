const express = require('express');
const router = express.Router();
const serviceTierModel = require('../public/models/ServiceTierModel');

//Get all serviceTier's details
router.get('/', async (req, res) => {
    const display = await serviceTierModel.find().sort('serviceId');
    res.send({ data: display });
});

//Add new servicetier
router.post('/insert', async (req, res) => {
    const data = req.body;
    const data1 = new serviceTierModel(data);
    await data1.save()
        .then(res.send({ message: 'Inserted!!' }))
        .catch((err) => res.send({ message: err }))
});

//Delete service_tier by servicetierId
router.delete('/delete/:_id', (req, res) => {
    const { _id } = req.params;
    serviceTierModel.findOne({ _id: _id }, async (err, serviceTier) => {
        if (serviceTier) {
            await serviceTierModel.deleteOne({ _id });
            res.send({ message: "Deleted!!" });
        }
        else {
            res.send({ message: "ServiceTier is not exits!!" });
        }
    });
});

//API for update serviceTier
router.put('/update/:_id', (req, res) => {
    const updata = req.body;
    const { _id } = req.params;
    serviceTierModel.findOne({ _id: _id }, async (err, service) => {
        if (service) {
            await serviceTierModel.updateOne({ _id }, { $set: updata });
            res.send({ message: "Updated!!" });
        }
        else {
            res.send({ message: "Service is not exits!!" });
        }
    });
});

module.exports = router;