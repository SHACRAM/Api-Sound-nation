const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');



//Route qui permet d'ajouter un utilisateur en base de données

router.post('/signup', async (req, res) => {
    const { email, identifiant, password, role } = req.body;

    const sqlVerifyUserExist = 'SELECT * FROM Users WHERE user_email = ?';

    mysqlClient.query(sqlVerifyUserExist, [email], async (error, result) => {
        if (error) {
            return res.status(500).json({ status: false, message: 'Erreur serveur, merci de réessayer ultérieurement' });
        }

        if (result.length > 0) {
            return res.status(400).json({ status: false, message: 'Vous possèdez déjà un compte' });
        } else {
            const sql = 'INSERT INTO Users (user_email, user_name, user_password, user_role) VALUES (?, ?, ?,?)';
            const hashedPassword = await bcrypt.hash(password, 10);

            mysqlClient.query(sql, [email, identifiant, hashedPassword, role], (error, result) => {
                if (error) {
                    return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
                } else {
                    return res.status(201).json({ status: true, message: 'Utilisateur ajouté avec succès' });
                }
            });
        }
    });
});

module.exports = router; 