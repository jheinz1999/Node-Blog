const express = require('express');
const helmet = require('helmet');

const userDB = require('./data/helpers/userDb');

const server = express();

const genericError = res => res.status(500).json({error: 'We were unable to process your request.'});

server.use(express.json());

server.get('/api/users', async (req, res) => {

  try {

    const data = await userDB.get();
    res.status(200).json(data);

  }

  catch (err) {

    genericError(res);

  }

});

server.get('/api/users/:id', async (req, res) => {

  try {

    const user = await userDB.get(req.params.id);

    if (user) {

      res.status(200).json(user);
      return;

    }

    res.status(404).json({error: 'User not found!'});

  }

  catch (err) {

    genericError(res);

  }

});

server.post('/api/users', async (req, res) => {

  const name = req.body.name;
  let id;

  if (!name || name.length > 128) {

    res.status(400).json({error: 'Invalid request!'});
    return;

  }

  try {

    try {

      id = await userDB.insert({name: req.body.name});

    }

    catch (err) {

      res.status(400).json({error: 'User already exists!'});
      return;

    }

    res.status(201).json(id);

  }

  catch (err) {

    res.status(500).json({error: 'We were unable to process your request.'});

  }

});

server.delete('/api/users/:id', async (req, res) => {

  try {

    const user = await userDB.get(req.params.id);

    if (!user) {

      res.status(404).json({error: "User not found!"});
      return;

    }

    await userDB.remove(req.params.id);

    res.status(200).json({message: 'User deleted!'});

  }

  catch (err) {

    genericError(res);
    return;

  }

});

server.put('/api/users/:id', async (req, res) => {

  try {

    const user = await userDB.get(req.params.id);

    if (!user) {

      res.status(404).json({error: 'User not found!'});
      return;

    }

    const name = req.body.name;

    if (!name) {

      res.status(400).json({error: 'Invalid request!'});
      return;

    }

    try {

      await userDB.update(req.params.id, {name});

    }

    catch (err) {

      res.status(400).json({error: 'Username exists! Pick another username.'});
      return;

    }

    res.status(200).json({message: 'User updated!'});

  }

  catch (err) {

    genericError(res);
    return;

  }

});

module.exports = server;
