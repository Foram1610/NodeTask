const express = require('express');
const router = express.Router();
const userServiceModel = require('../public/models/UserServiceModel');
const serviceModel = require('../public/models/ServiceModel');

//Home page for User_Service
router.get('/', (req, res) => {
    res.send({ message: 'User_Service Home page!!!' });
});

//Add Checkout details
router.post('/insert', async (req, res) => {
    const data = req.body;
    const data1 = new userServiceModel(data);
    await data1.save()
        .then(res.send({ message: "Inserted!!" }))
        .catch((err) => res.send({ message: err }))
});

router.post('/getAllByService/:name', async (req, res) => {
    const { name } = req.params;
    const serv = await serviceModel.findOne({ name: name });
    const id = serv._id;
    const data2 = await userServiceModel.find({ serviceId: id }).populate(
        [{ path: 'serviceId', model: 'ServiceModel' },
        { path: 'serviceTierId', model: 'ServiceTierModel' }
        ]);
    res.send({ data: data2 });
});

module.exports = router;