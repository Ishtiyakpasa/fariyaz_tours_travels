const express = require('express');
const app = express();
const admin = require('./routes/admin')
const path = require('path');
const session = require('express-session');
const user = require('./routes/user');
const expressLayouts = require('express-ejs-layouts');
const upload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
app.set('view engine','ejs')

// Middleware to set base URL
app.use((req, res, next) => {
    res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    next();
});

app.use(cookieParser());
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin',admin);
app.use('/user', user);

app.use(express.static(__dirname + '/public'));
app.set('layout', 'common/layout-vertical');
app.use(expressLayouts);
app.use(upload());

app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());

app.listen(7000);