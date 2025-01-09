const jwt = require('jsonwebtoken');
// Middleware qui permet de vérifier si un utilisateur est authentifié
 
const auth = (req, res, next)=>{
    const token = req.cookies.auth_token;

    if(!token) return res.status(401).json({status: false, message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'});

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=>{
        if(error) return res.status(403).json({status : false, message : 'Token invalide'});
        req.user = user;
        next();
    })



}
module.exports = auth;