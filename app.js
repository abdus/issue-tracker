const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes/index.routes');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_STRING);

app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use('/', routes);

app.set('view engine', 'ejs');

app.listen(4000);