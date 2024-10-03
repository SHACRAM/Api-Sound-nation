const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Création d'un jeton JWT à partir des données fournies
const createTokenFromJson = (jsonData) => {
    try {
        //TODO enregistrer la clé secrète dans un fichier de configuration
      const secretKey = "secretKey";
      const token = jwt.sign(jsonData, secretKey);
      return token;
    } catch (error) {
      console.log("error :", error.message);
      return null;
    }
  };


//Route de connexion d'un utilisateur
router.post('/signin', async (req, res) => {
    const { identifiant, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE user_name = ?';

    try {
        mysqlClient.query(sql, [identifiant], async (error, result) => {
            if (error) {
                return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
            }

            if (result.length === 0) {
                return res.status(401).json({ status: false, message: 'Compte inconnu' });
            }

            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.user_password);

            if (!passwordMatch) {
                return res.status(401).json({ status: false, message: 'Mot de passe  incorrects' });
            }

            const jsonData = {
                name: user.user_name
            };

            const token = createTokenFromJson(jsonData);

            if (token) {
                return res.status(200).json({
                    status: true,
                    message: 'Connexion réussie',
                    token: token,
                    name: user.user_name,
                });
            } else {
                return res.status(401).json({
                    status: false,
                    message: 'Identifiants inconnus',
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});

module.exports = router;





