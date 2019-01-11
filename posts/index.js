const express = require('express');

const genericError = require('../common/genericError');
const postDB = require('../data/helpers/postDb');
const userDB = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    let posts;

    if (!req.query.userId) {

      posts = await postDB.get();
      res.status(200).json(posts);
      return;

    }

    posts = await userDB.getUserPosts(req.query.userId);

    if (!posts.length) {

      res.status(400).json({error: 'Invalid user id!'});

    }

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

  if (!text || !userId) {

    res.status(400).json({error: 'Invalid request!'});
    return;

  }

  const user = await userDB.get(userId);

  if (!user) {

    res.status(400).json({error: 'User does not exist'});
    return;

  }

  try {

    try {

      id = await postDB.insert({userId, text});

    }

    catch (err) {

      res.status(400).json({msg: err, error: 'Post already exists!'});
      return;

    }

    res.status(201).json(id);

  }

  catch (err) {

    genericError(res);

  }

});

router.delete('/:id', async (req, res) => {

  try {

    const post = await postDB.get(req.params.id);

    if (!post) {

      res.status(404).json({error: "Post not found!"});
      return;

    }

    await postDB.remove(req.params.id);

    res.status(200).json({message: 'Post deleted!'});

  }

  catch (err) {

    genericError(res);
    return;

  }

});

router.put('/:id', async (req, res) => {

  try {

    const id = req.params.id;
    const post = await postDB.get(id);

    if (!post) {

      res.status(404).json({error: 'Post not found!'});
      return;

    }

    const { userId, text } = req.body;

    if (!userId) {

      res.status(400).json({error: 'You forgot to send a userId property!'});
      return;

    }

    if (!text) {

      res.status(400).json({error: 'You forgot to send the updated text!'});
      return;

    }

    if (userId != post.userId) {

      res.status(403).json({error: 'Your user ID doesn\'t match this post!'});
      return;

    }

    console.log('test');

    await postDB.update(req.params.id, { id, userId, text });

    console.log('test2');

    res.status(200).json({message: 'Post updated!'});

  }

  catch (err) {

    console.log(err);
    genericError(res);
    return;

  }

});

module.exports = router;
