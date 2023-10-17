const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

router.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.send({ isAuthenticated: true });
    } else {
        res.send({ isAuthenticated: false });
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists', });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).send({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'Login successful' });
  });

module.exports = router;
