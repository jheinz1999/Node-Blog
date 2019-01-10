const express = require('express');
const helmet = require('helmet');

const userRouter = require('./clients');
const postRouter = require('./posts');
const genericError = require('./common/genericError');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;
