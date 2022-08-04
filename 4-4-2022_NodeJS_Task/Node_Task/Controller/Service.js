const express = require('express');
const router = express.Router();
const serviceModel = require('../models/ServiceModel');

//conver data into json form to store in database
router.use(express.json());

//Home page of Service
// router.get('/',(req,res) => {
//     res.send({message :'Service Home page!!!'});
// });

//Get all service's details 
router.get('/',async (req,res) => {
    const display = await serviceModel.find();
    res.send(display);
});

//Add new service
router.post('/insert',async (req,res) => {
    const data = req.body;
    const data1 = new serviceModel(data);
    await data1.save()
    .then(res.send({message:'Inserted!!'}))
    .catch((err) => console.log(err))
});

//Delete service by serviceId
router.delete('/delete/:_id', (req,res) => {
    const { _id } = req.params;
    serviceModel.findOne({_id : _id}, async(err,service) => {
        if(service){
            await serviceModel.deleteOne({_id});
            res.send({message:"Deleted!!"});
        }
        else{
            res.send({message:"Service is not exits!!"});
        }
    });
});

module.exports = router;