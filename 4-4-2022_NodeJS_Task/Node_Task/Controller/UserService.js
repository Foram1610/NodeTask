const express = require('express');
const router = express.Router();
const userServiceModel = require('../models/UserServiceModel');
const serviceModel = require('../models/ServiceModel');

router.use(express.json());

//Home page for User_Service
router.get('/',(req,res) => {
    res.send({message : 'User_Service Home page!!!'});
});

//Add Checkout details
router.post('/insert', async (req,res) => {
    const data = req.body;
    const data1 =  new userServiceModel(data);
    await data1.save()
    .then(res.send({message:"Inserted!!"}))
    .catch((err) => res.send({message:err}))
});

//Get all user's data with thier selected service

// router.get('/getAll', async (req,res) => {
//     const display = await userServiceModel.find().populate({path:'serviceId', model: 'ServiceModel'});
//     res.send(display);
// });

// router.get('/getAllByService/:serviceId',async (req,res) => {
//     const {serviceId} = req.params;
//     const d1 = await userServiceModel.find({serviceId:serviceId}).populate(
//         [{path:'serviceId', model: 'ServiceModel'},
//         {path:'serviceTierId', model: 'ServiceTierModel'}
//     ]);
//     res.send(d1);
// })

router.post('/getAllByService/:name', async (req,res) => {
    const {name} = req.params;
    const serv = await serviceModel.findOne({name:name});
    const id = serv._id;
    const data2 = await userServiceModel.find({serviceId: id}).populate(
        [{path:'serviceId', model: 'ServiceModel'},
        {path:'serviceTierId', model: 'ServiceTierModel'}
    ]);
    res.send({data:data2});
});

module.exports = router;