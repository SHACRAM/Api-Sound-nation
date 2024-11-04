const express = require('express');
const path = require('path');
const userRouter = require('./Routes/user');
const authenticationRouter = require('./Routes/Authentication');
const groupeRouter = require('./Routes/groupe');
const partnerRouter = require('./Routes/partner');
const placeRouter = require('./Routes/place');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/api/user', userRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/groupes', groupeRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/places', placeRouter);











module.exports = app;