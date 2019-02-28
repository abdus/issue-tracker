const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/index.routes');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_STRING);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      autoReconnect: true,
      mongooseConnection: mongoose.connection
    })
  })
);
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use('/', routes);

app.set('view engine', 'ejs');

app.listen(4000);
