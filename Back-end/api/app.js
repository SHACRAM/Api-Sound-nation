const express = require('express');
const path = require('path');
const userRouter = require('../routes/user');
const authenticationRouter = require('../routes/authentication');
const groupeRouter = require('../routes/groupe');
const partnerRouter = require('../routes/partner');
const placeRouter = require('../routes/place');
const informationRouter = require('../routes/informations');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Liste des origines autorisées
const allowedOrigins = [
    'https://back-office-api-sound-nation.vercel.app',
    'https://sound-nation.vercel.app',
    'https://soundnation.duckdns.org',
    'http://localhost:5173'
];

// Configuration du middleware CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(204).end(); 
    }
    next();
});



// Configuration des fichiers statiques et des middlewares
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/groupes', groupeRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/places', placeRouter);
app.use('/api/informations', informationRouter);

// Route de test
app.get('/api/test', (req, res) => {
    res.send({ test: 'test' });
});

module.exports = app;
