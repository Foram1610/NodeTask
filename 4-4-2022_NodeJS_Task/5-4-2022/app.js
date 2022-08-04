const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const con = require('./bin/connection');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const service = require('./routes/Service');
const serviceTier = require('./routes/ServiceTier');
const userService = require('./routes/UserService');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api', (req, res) => {
    res.send({ message: 'Main Home page!!!' });
});
app.use('/api/service', service);
app.use('/api/serviceTier', serviceTier);
app.use('/api/userService', userService);

module.exports = app;
