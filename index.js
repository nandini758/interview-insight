const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./database/db.js');
const app = express();

db.connectMongo();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/auth', require('./controller/login.js'));
app.use('/api/v1/insight', require('./controller/insight.js'));

app.use((req, res, next) => {
    res.status(404).send('Page Not Found 404');
    next()
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
