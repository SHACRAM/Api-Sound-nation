const jwt = require('jsonwebtoken');

// Middleware qui permet de vérifier si un utilisateur est authentifié
const auth = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.clearCookie('auth_token');
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        return res.redirect(baseUrl); // Redirige vers l'URL de base si le token est manquant
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            res.clearCookie('auth_token');
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            return res.redirect(baseUrl); // Redirige vers l'URL de base si le token est invalide
        }
        req.user = user;
        next();
    });
};

module.exports = auth;