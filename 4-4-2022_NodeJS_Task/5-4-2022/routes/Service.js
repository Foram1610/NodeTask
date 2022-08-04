const express = require('express');
const router = express.Router();
const serviceModel = require('../public/models/ServiceModel');

//Get all service's details 
router.get('/', async (req, res) => {
    const display = await serviceModel.find();
    res.send({ data: display });
});

//Add new service
router.post('/insert', async (req, res) => {
    const data = req.body;
    const data1 = new serviceModel(data);
    await data1.save()
        .then(res.send({ message: 'Inserted!!' }))
        .catch((err) => res.send({ message: err }))
});

//Delete service by serviceId
router.delete('/delete/:_id', (req, res) => {
    const { _id } = req.params;
    serviceModel.findOne({ _id: _id }, async (err, service) => {
        if (service) {
            await serviceModel.deleteOne({ _id });
            res.send({ message: "Deleted!!" });
        }
        else {
            res.send({ message: "Service is not exits!!" });
        }
    });
});

//API for Add and Edit service
router.post('/add_edit', (req, res) => {
    const { name, description } = req.body;
    serviceModel.findOne({ name: name }, async (err, service) => {
        if (service) {
            await serviceModel.updateOne({ name }, { $set: { name, description } });
            res.send({ message: "Updated!!" });
        }
        else {
            const data1 = new serviceModel({ name, description });
            await data1.save()
                .then(res.send({ message: 'Inserted!!' }))
                .catch((err) => res.send({ message: err }))
        }
    });
});

//API for update service
router.put('/update/:_id', (req, res) => {
    const updata = req.body;
    const { _id } = req.params;
    serviceModel.findOne({ _id: _id }, async (err, service) => {
        if (service) {
            await serviceModel.updateOne({ _id }, { $set: updata });
            res.send({ message: "Updated!!" });
        }
        else {
            res.send({ message: "Service is not exits!!" });
        }
    });
});

module.exports = router;