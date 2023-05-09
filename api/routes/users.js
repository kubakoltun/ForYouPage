const express = require('express');
const router = express.Router();
const { users } = require('../models');
const { validateToken } = require('../middlewares/authMiddleware.js')
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => {
            users.create({
                username: username,
                password: hash,
            });
            res.json("success of creating a user")
        });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await users.findOne({ where: { username: username }});
    
    if (!user) {
        res.json({error: "User Does not Exists"});
    } else {
        bcrypt.compare(password, user.password)
        .then((match) => {
            if (!match) {
                res.json({error: "Wrong Username and Password Combination"});
            } else {
                const accessToken = sign(
                    { username: user.username, id: user.id },
                     "importantsecret"
                    );
    
                res.json(accessToken);
            }
        });
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
