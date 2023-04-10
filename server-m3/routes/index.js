const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./usersRouter');
const posteosRouter = require('./posteosRouter');
const productsRouter = require('./productsRouters');

const server = express();

//settings
server.set('case sensitive routinig', true)
server.set('serverName', 'Experimenting with Express');
server.set('port', 3000);

//middleware
server.use(express.json());
server.use(morgan('dev'));
server.use(express.static('../public'))

//routes
server.use('/Users', usersRouter);
server.use('/Posteos', posteosRouter);
server.use('/Products', productsRouter);


module.exports = server;