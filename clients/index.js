const express = require('express');

const genericError = require('../common/genericError');
const userDB = require('../data/helpers/userDb');

const upperCaser = (req, res, next) => {

  if (req.body.name) req.body.name = req.body.name.toUpperCase();
  next();

}

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const data = await userDB.get();
    res.status(200).json(data);

  }

  catch (err) {

    genericError(res);

  }

});

router.get('/:id', async (req, res) => {

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

router.post('/', upperCaser, async (req, res) => {

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

      res.status(400).json({msg: err, error: 'User already exists!'});
      return;

    }

    res.status(201).json(id);

  }

  catch (err) {

    res.status(500).json({error: 'We were unable to process your request.'});

  }

});

router.delete('/:id', async (req, res) => {

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

router.put('/:id', upperCaser, async (req, res) => {

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

module.exports = router;
