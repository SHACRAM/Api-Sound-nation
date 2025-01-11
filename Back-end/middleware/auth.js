const jwt = require('jsonwebtoken');

// Middleware qui permet de vérifier si un utilisateur est authentifié
const auth = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.clearCookie('auth_token');
        return res.redirect(req.get('origin'));
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            res.clearCookie('auth_token');
            return res.redirect(req.get('origin')); 
        }
        req.user = user;
        next();
    });
};

module.exports = auth;