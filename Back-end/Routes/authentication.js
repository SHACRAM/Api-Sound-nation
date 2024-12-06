const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../Middleware/auth');

// Création d'un jeton JWT à partir des données fournies
const createTokenFromJson = (jsonData) => {
    try {
        // TODO enregistrer la clé secrète dans un fichier de configuration
        const secretKey = "secretKey";
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
            return res.status(401).json({ status: false, message: 'Vous n\'avez pas les droits pour accéder à cette page' });
        }
        if (error.message === 'IDENTIFIANT_INVALIDE') {
            return res.status(401).json({ status: false, message: 'Erreur, merci de vérifier vos identifiants' });
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
router.post('/modifyPassword', auth, async (req,res)=>{
    const {password,userEmail} = req.body;

    if(!password || !userEmail){
        return res.status(400).json({status: false, message: 'Veuillez renseigner tous les champs'})
    }
try{
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'UPDATE Users SET user_password = ? WHERE user_email = ?';

    const rows= await mysqlClient.query(sql, [hashedPassword, userEmail]);

    if(rows.affectedRows > 0){
        return res.status(200).json({status: true, message: 'Votre mot de passe a été modifié avec succès'})
    }
}catch(error){
    console.log('Erreur:', error.message);
    return res.status(500).json({status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement'})

}
})





module.exports = router;
 




