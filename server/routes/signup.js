const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    const existingUsere = await User.findOne({ email });
    if (existingUsere) {
      return res.status(400).send({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    req.session.user = { username }; // Set session
    res.cookie('user', { username });

    res.status(201).send({ message: 'Registration successful' }).redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = app;

// const express = require('express');
// const User = require('../model/user');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//   console.log("s1 clear");
//   const { fullname, username, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       res.redirect('/login')
//       return res.status(400).send({ message: 'Username already exists' });
//     }

//     const existingUsere = await User.findOne({ email });  
//     if (existingUsere) {
//       res.redirect('/login')
//       return res.status(400).send({ message: 'Email already exists' });
//     }

//     const newUser = new User({ fullname, username, email, password });
//     await newUser.save();
//     res.redirect('/');

//     res.status(201).send({ message: 'Registration successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// module.exports = router;
