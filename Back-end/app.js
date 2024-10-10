const express = require('express');

const userRouter = require('./Routes/user');
const authenticationRouter = require('./Routes/Authentication');
const groupeRouter = require('./Routes/groupe');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/groupe', groupeRouter);









module.exports = app;