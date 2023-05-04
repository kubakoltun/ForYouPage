const express = require('express');
const router = express.Router();
const { comments } = require('../models');

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const commentsContent = await comments.findAll({
        where: { postId: postId }
    });
    res.json(commentsContent);
});

router.post('/', async (req, res) => {
    const comment = req.body;
    await comments.create(comment);
    res.json(comment);
});

module.exports = router;