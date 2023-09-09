const express = require('express');
const router = express.Router();
const { comments } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware.js')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const commentsContent = await comments.findAll({
        where: { postId: postId }
    });
    res.json(commentsContent);
});

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await comments.create(comment);
    res.json(comment);
});

router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await comments.destroy({
        where: {
            id: commentId,
        }
    });

    res.json("comment deleted");
});

module.exports = router;
