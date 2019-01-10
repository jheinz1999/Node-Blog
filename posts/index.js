const express = require('express');

const genericError = require('../common/genericError');
const postDB = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const posts = await postDB.get();
    res.status(200).json(posts);

  }

  catch (err) {

    genericError(res);

  }

});

router.get('/:id', async (req, res) => {

  try {

    const post = await postDB.get(req.params.id);

    if (post) {

      res.status(200).json(post);
      return;

    }

    res.status(404).json({error: 'Post not found!'});

  }

  catch (err) {

    genericError(res);

  }

});



router.post('/', async (req, res) => {

  const { userId, text } = req.body;
  let id;

  if (!text) {

    res.status(400).json({error: 'Invalid request!'});
    return;

  }

  try {

    try {

      id = await postDB.insert({userId, text});

    }

    catch (err) {

      res.status(400).json({msg: err, error: 'User already exists!'});
      return;

    }

    res.status(201).json(id);

  }

  catch (err) {

    genericError(res);

  }

});

module.exports = router;
