const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');



//Route qui permet d'ajouter un utilisateur en base de données

router.post('/signup', async (req, res) => {
    const { identifiant, password } = req.body;

    const sqlVerifyUserExist = 'SELECT * FROM Users WHERE user_name = ?';

    mysqlClient.query(sqlVerifyUserExist, [identifiant], async (error, result) => {
        if (error) {
            return res.status(500).json({ status: false, message: 'Erreur serveur, merci de réessayer ultérieurement' });
        }

        if (result.length > 0) {
            return res.status(400).json({ status: false, message: 'Cet identifiant existe déjà' });
        } else {
            const sql = 'INSERT INTO Users (user_name, user_password) VALUES (?, ?)';
            const hashedPassword = await bcrypt.hash(password, 10);

            mysqlClient.query(sql, [identifiant, hashedPassword], (error, result) => {
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