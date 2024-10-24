const express = require('express');
const path = require('path');
const userRouter = require('./Routes/user');
const authenticationRouter = require('./Routes/Authentication');
const groupeRouter = require('./Routes/groupe');
const partnerRouter = require('./Routes/partner');
const app = express();
const cors = require('cors');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/groupes', groupeRouter);
app.use('/api/partners', partnerRouter);











module.exports = app;