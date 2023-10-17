const express = require('express');
const User = require('../model/user');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const passport = require('passport');
// const crypto = require('crypto');
const session = require('express-session');
const app = express();
dotenv.config({ path: './config.env' });
const session_key = process.env.SESSION_KEY;
// const secretKey = crypto.randomBytes(32).toString('hex');
app.use(express.json());
app.use(
  session({
    secret: session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.post('/signin', passport.authenticate('local'), (req, res) => {
  res.send({ message: 'Login successful' });
});

// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const User = require('../model/user');

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// app.use(cors());

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//       const foundUser = await User.findOne({ username, password });

//       if (foundUser) {
//           res.status(200).send({ message: 'Login successful' });
//       } else {
//           res.status(401).send({ message: 'Invalid credentials' });
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: 'Server error' });
//   }
// });
// app.post('/login', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     //const foundUser = await User.findOne({ email, password }).exec();
//     const foundUser = await User.findOne({ $or: [{ username }, { email }], password });
//     if (foundUser) {
//       //req.session.isAuthenticated = true;
//       //console.log("p12");
//       req.session.user = { username: foundUser.username }; // Set session
//       res.cookie('user', { username: foundUser.username }); // Set cookie
//       //console.log("p13");
//       // Check if the user is already logged in
//       if (!req.session.user) {
//         //console.log("p14");
//         // If the user is not logged in, redirect to the login page
//         res.redirect('/login');
//       } else {
//         //console.log("p15");
//         // If the user is logged in, redirect to the home page
//         res.redirect('/');
//       }
//     } else {
//       //console.log("p16");
//       res.status(401).send({ message: 'Invalid credentials' });
//     }
//     // if (foundUser) {
//     //   req.session.isAuthenticated = true;
//     //   req.session.email = email;
//     //   res.cookie('email', email);

//     //   res.status(200).send({ message: 'Login successful' });
//     // } else {
//     //   res.status(401).send({ message: 'Invalid credentials' });
//     // }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

app.get('/check-auth', (req, res) => {
  if (req.session.isAuthenticated) {
    res.status(200).send({ isAuthenticated: true });
  } else {
    res.status(401).send({ isAuthenticated: false });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('email');
  // res.status(200).send({ message: 'Logout successful' });
  res.redirect('/signin');
});

module.exports = app;
// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// const User = require('../model/user');

// const app = express();

// // Middleware
// //app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: 'your-secret-key', // Change this to a secure secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Change this to true in a production environment with HTTPS
//   })
// );

// // Middleware (use appropriate cors settings if needed)
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const foundUser = await User.findOne({ email, password }).exec();

//     if (foundUser) {
//       req.session.isAuthenticated = true;
//       req.session.email = email;
//       res.cookie('email', email);

//       res.status(200).send({ message: 'Login successful' });
//     } else {
//       res.status(401).send({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// module.exports = app;
// // Import the User model
// //const User = require('../db/userSchema');
// // Check if the user is authenticated
// app.get('/check-auth', (req, res) => {
//   if (req.session.isAuthenticated) {
//     res.status(200).send({ isAuthenticated: true });
//   } else {
//     res.status(401).send({ isAuthenticated: false });
//   }
// });
// // Login route
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const foundUser = await User.findOne({ email, password }).exec();

// //     if (foundUser) {
// //       req.session.isAuthenticated = true;
// //       req.session.email = { email }; // Set session
// //       res.cookie('email', { email }); // Set cookie
// //       res.status(200).send({ message: 'Login successful' });
// //       //res.redirect('/');
// //     } else {
// //       //alert('Invalid Credentials!')
// //       res.status(401).send({ message: 'Invalid credentials' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send({ message: 'Server error' });
// //   }
// // });
// // app.post('/login', async (req, res) => {
// //   const { username, email, password } = req.body;
// //   //console.log("p11");
// //   try {
// //     const foundUser = await User.findOne({ $or: [{ username }, { email }], password });

// //     if (foundUser) {
// //       //req.session.isAuthenticated = true;
// //       //console.log("p12");
// //       //req.session.user = { username: foundUser.username }; // Set session
// //       //res.cookie('user', { username: foundUser.username }); // Set cookie
// //       //console.log("p13");
// //       // Check if the user is already logged in
// //       //if (!req.session.user) {
// //         //console.log("p14");
// //         // If the user is not logged in, redirect to the login page
// //         res.redirect('/login');
// //       //} else {
// //         //console.log("p15");
// //         // If the user is logged in, redirect to the home page
// //         //res.redirect('/');
// //       //}
// //     } else {
// //       //console.log("p16");
// //       res.status(401).send({ message: 'Invalid credentials' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send({ message: 'Server error' });
// //   }
// // });

// // app.post('/login', async (req, res) => {
// //   const { username, email, password } = req.body;

// //   try {
// //     const foundUser = await Users.findOne({ $or: [{ username }, { email }], password });

// //     if (foundUser) {
// //       res.redirect('/login');
// //     } else {
// //       res.status(401).send({ message: 'Invalid credentials' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send({ message: 'Server error' });
// //   }
// // });


// // Logout route
// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.clearCookie('user');
//   res.status(200).send({ message: 'Logout successful' });
//   res.redirect('/login');
// });
// module.exports = app;