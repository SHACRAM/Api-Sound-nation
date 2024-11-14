const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../Middleware/auth');

//Création d'un jeton JWT à partir des données fournies
const createTokenFromJson = (jsonData) => {
    try {
        //TODO enregistrer la clé secrète dans un fichier de configuration
      const secretKey = "secretKey";
      const expirationTime = 60 * 60 * 24;
      const token = jwt.sign(jsonData, secretKey, { expiresIn: expirationTime });
      return token;
    } catch (error) {
      console.log("error :", error.message);
      return null;
    }
  };


//Route de connexion d'un utilisateur
router.post('/signin', async (req, res) => {
    const { email, identifiant, password, role } = req.body;
    const sql = 'SELECT * FROM Users WHERE user_email = ?';

    try {
        mysqlClient.query(sql, [email], async (error, result) => {
            if (error) {
                return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
            }

            if (result.length === 0 || result[0].user_role !== 'admin') {
                return res.status(401).json({ status: false, message: 'Compte inconnu ou non autorisé' });
            }

            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.user_password);

            if (!passwordMatch) {
                return res.status(401).json({ status: false, message: 'Mot de passe  incorrects' });
            }

            const jsonData = {
                name: user.user_name,
                userId: user.id
            };

            const token = createTokenFromJson(jsonData);

            res.cookie('auth_token', token, 
                {httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/' 
                }
            )

            res.status(200).json({status: true, message : 'Connexion réussie', name : user.user_name});

        });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
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





module.exports = router;





