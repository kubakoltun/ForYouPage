const express = require('express');
const router = express.Router();
const { posts, likes } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware.js')

router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await posts.findAll({include: [likes]});
    
    const likedPosts = await likes.findAll({where: {userId: req.user.id}});
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    res.json(post);
});

router.post('/', async (req, res) => {
    const post = req.body;
    await posts.create(post);
    res.json(post);
});

module.exports = router;
