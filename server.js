const express = require('express');
const helmet = require('helmet');

const userDB = require('./data/helpers/userDb');

const server = express();

server.use(express.json());

server.get('/api/users', async (req, res) => {

  try {

    const data = await userDB.get();
    res.status(200).json(data);

  }

  catch (err) {

    res.status(500).json({error: 'We were unable to process your request.'});

  }

});

module.exports = server;
