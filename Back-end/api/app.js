const express = require('express');
const path = require('path');
const userRouter = require('../routes/user'); 
const authenticationRouter = require('../routes/authentication'); 
const groupeRouter = require('../routes/groupe'); 
const partnerRouter = require('../routes/partner'); 
const placeRouter = require('../routes/place');
const informationRouter = require('../routes/informations'); 
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: ['https://back-office-api-sound-nation.vercel.app', 'https://sound-nation.vercel.app'], 
    credentials: true, 
  }));

  app.use((req, res, next) => {
    res.removeHeader('Permissions-Policy');
    next();
  });


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
app.use(cookieParser());




app.use('/api/users', userRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/groupes', groupeRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/places', placeRouter);
app.use('/api/informations', informationRouter);

app.get('/api/test', (req, res) => {
  res.send({test:'test'});
});














module.exports = app;