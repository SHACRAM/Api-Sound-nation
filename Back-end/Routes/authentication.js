const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../Middleware/auth');
require('dotenv').config();

// Création d'un jeton JWT à partir des données fournies
const createTokenFromJson = (jsonData) => {
    try {
        const secretKey = process.env.TOKEN_SECRET;
        const expirationTime = 60 * 60 * 24;
        const token = jwt.sign(jsonData, secretKey, { expiresIn: expirationTime });
        return token;
    } catch (error) {
        console.log("error :", error.message);
        return null;
    }
};

router.post('/signin', async (req, res) => {
    const { email, password, backEndConnect } = req.body;

    const sql = 'SELECT * FROM Users WHERE user_email = ?';

    try {
        if (!email || !password) {
            throw new Error('CHAMPS_MANQUANTS');
        }
        const [rows] = await mysqlClient.query(sql, [email]);

        if (rows.length === 0) {
            throw new Error('IDENTIFIANT_INVALIDE');
        }
       

        const user = rows[0];
        if (user.user_role === 'user' && backEndConnect) {
            throw new Error('DROITS_INSUFFISANTS');
        }

        const passwordMatch = await bcrypt.compare(password, user.user_password);

        if (!passwordMatch) {
            return res.status(401).json({ status: false, message: 'Mot de passe incorrect' });
        }

        const jsonData = {
            user_name: user.user_name,
            user_email: user.user_email,
            user_role: user.user_role
        };

        const token = createTokenFromJson(jsonData);

        res.cookie('auth_token', token, { 
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.status(200).json({ status: true, message: 'Connexion réussie', data: user });
    } catch (error) {
        if (error.message === 'DROITS_INSUFFISANTS') {
            return res.status(403).json({ status: false, message: 'Vous n\'avez pas les droits pour accéder à cette page' });
        }
        if (error.message === 'IDENTIFIANT_INVALIDE') {
            return res.status(401).json({ status: false, message: 'Erreur, merci de vérifier vos identifiants' });
        }
        if (error.message === 'CHAMPS_MANQUANTS') {
            return res.status(400).json({ status: false, message: 'Veuillez renseigner tous les champs' });
        }
        console.error('Erreur serveur:', error);
        return res.status(500).json({ status: false, message: 'Une erreur est survenue, merci de réessayer plus tard' }); 
    }
});



// Route qui vérifie l'authentification
router.get('/verify-auth', auth, (req, res) => {
    res.status(200).json({ status: true, message: 'Utilisateur authentifié' });
});

// Route de déconnexion d'un utilisateur
router.get('/logOut', (req,res)=>{
    res.clearCookie('auth_token');
    res.status(200).json({status: true, message: 'Déconnexion réussie'})
})

// Route de modification du mot de passe
router.put('/:email', auth, async (req,res)=>{
    const {password} = req.body;
    const {email} = req.params;

   
try{

    if(!password || !email){
        throw new Error('CHAMPS_MANQUANTS');
    }

    if(password.length < 8){
        throw new Error('MOT_DE_PASSE_INVALIDE');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'UPDATE Users SET user_password = ? WHERE user_email = ?';

    const [result]= await mysqlClient.query(sql, [hashedPassword, email]);

    if(result.affectedRows > 0){
        return res.status(200).json({status: true, message: 'Votre mot de passe a été modifié avec succès'})
    }
}catch(error){
    if(error.message === 'CHAMPS_MANQUANTS'){
        return res.status(400).json({status: false, message: 'Veuillez renseigner tous les champs'})
    }
    if(error.message === 'MOT_DE_PASSE_INVALIDE'){
        return res.status(400).json({status: false, message: 'Le mot de passe doit contenir au moins 8 caractères'})
    }
    console.error('Erreur:', error.message);
    return res.status(500).json({status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement'})

}
})





module.exports = router;
 




