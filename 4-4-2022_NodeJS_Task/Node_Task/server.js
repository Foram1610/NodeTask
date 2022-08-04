const express = require('express');
const port = 3000;
const app = express();
const service = require('./Controller/Service');
const serviceTier = require('./Controller/ServiceTier');
const userService = require('./Controller/UserService');
const con = require('./Configuration/connection');

app.get('/api',(req,res)=>{
    res.send('Main Home page!!!');
});

app.use('/api/service',service);

app.use('/api/serviceTier',serviceTier);

app.use('/api/userService',userService);


app.listen(port,console.log(`Server running on port ${port}!!`));