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
    
                res.json({token: accessToken, username: username, id: user.id});
            }
        });
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;
    const bacisInfo = await users.findByPk(id, {
        attributes: {exclude: ['password']}
    });

    res.json(bacisInfo);
});

router.put('/change-password', validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await users.findOne({
        where: {username: req.user.username}
    });

    bcrypt.compare(oldPassword, user.password)
        .then(async (match) => {
            if (!match) {
                res.json({error: "Entered wrong old password"});
            } else {
                bcrypt.hash(newPassword, 10)
                .then(async (hash) => {
                    await users.update({password: hash}, {where: {username: req.user.username}})
                    res.json("successfuly updated a password");
                });
            }
        });
});

module.exports = router;
