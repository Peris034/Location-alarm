const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

// const crypto = require('crypto');
const authRoutes = require('./routes/auth');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/signin');
const cookieParser = require('cookie-parser');
// const secretKey = crypto.randomBytes(32).toString('hex');
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual origin of your client app
    credentials: true, // Make sure this is set to true if you're using cookies
};
dotenv.config({ path: './config.env' });
const session_key = process.env.SESSION_KEY;
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/fswd', 
        ttl: 30 * 60, // Session will expire in 30 minutes (optional)
    }),
    cookie: { secure: false },
}));

require('./db/conn');

app.use(cors());
app.use(bodyParser.json());
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/signup', signupRoutes);
app.use('/signin', loginRoutes);

// we link the router files to make our route easy 
app.use(require('./routes/auth'));

const PORT = process.env.PORT;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database');
});

const checkAuth = (req, res, next) => {
    if (req.session.user || req.cookies.user) {
        res.redirect('/profile');
        return next();
    } else {
        res.redirect('/signin');
    }
};

app.get('/profileuser', checkAuth, (req, res) => {
    console.log('User Data:', req.session.user);
    const userData = req.session.user;
    res.status(200).json(userData);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/check-auth', (req, res) => {
    res.send({ isAuthenticated: req.isAuthenticated() });
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})
