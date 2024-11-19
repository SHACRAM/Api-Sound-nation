const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// Route pour ajouter un utilisateur en base de données
router.post('/signup', async (req, res) => {
    const { email, identifiant, password, role } = req.body;

    try {
        const [existingUser] = await mysqlClient.query('SELECT * FROM Users WHERE user_email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ status: false, message: 'Vous possédez déjà un compte avec cet email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO Users (user_email, user_name, user_password, user_role) VALUES (?, ?, ?, ?)';
        await mysqlClient.query(sql, [email, identifiant, hashedPassword, role]);

        return res.status(201).json({ status: true, message: 'Votre compte a été créé avec succès' });

    } catch (error) {
        console.error('Erreur serveur:', error);
        return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});



// Route pour récupérer les informations d'un utilisateur en fonction de son adresse mail
router.get('/information/:email', async (req, res) => {
    const userEmail = req.params.email;

    if (!userEmail) {
        return res.status(400).json({ status: false, message: 'Email invalide.' });
    }

    try {
        const [result] = await mysqlClient.query('SELECT * FROM Users WHERE user_email = ?', [userEmail]);

        if (result.length === 0) {
            return res.status(404).json({ status: false, message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json({ status: true, data: result[0] });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});



// Route qui permet de récupérer les informations du token
router.get('/connectInformation', async (req,res)=>{
    const token = req.cookies['auth_token'];
    try{
        const decodedToken = jwt.verify(token, 'secretKey');
        return res.status(200).json({status:true, data:decodedToken});

    }catch(error){
        return res.status(200).json({status:false, message: 'Token invalide'});
    }
})

// Route pour modifier les informations d'un utilisateur
router.post('/updateUser/:email', async (req, res) => {
    const userEmail = req.params.email;
    const { name, email } = req.body;

    try {
        // Récupérer l'ID de l'utilisateur
        const [rows] = await mysqlClient.query('SELECT id FROM Users WHERE user_email = ?', [userEmail]);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Utilisateur non trouvé' });
        }

        const userId = rows[0].id;

        const [updateResult] = await mysqlClient.query('UPDATE Users SET user_name = ?, user_email = ? WHERE id = ?', [name, email, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Aucune mise à jour effectuée' });
        }

        const [userRows] = await mysqlClient.query('SELECT user_name, user_email FROM Users WHERE id = ?', [userId]);

        const updatedUser = userRows[0];

        // Générer un nouveau token avec les informations mises à jour
        const token = jwt.sign(
            { user_name: updatedUser.user_name, user_email: updatedUser.user_email },
            'secretKey'
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000, 
            path: '/'
        });

        return res.status(200).json({
            status: true,
            message: 'Informations mises à jour avec succès',
            data: updatedUser
        });
    } catch (error) {
        console.error("Erreur serveur:", error);
        return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});


// Route pour ajouter un groupe dans les favoris de l'utilisateur
router.post('/favoris', async (req, res) => {
    const { groupeId, userEmail } = req.body;

    if (!groupeId || !userEmail) {
        return res.status(400).json({ status: false, message: 'Les champs groupeId et userEmail sont requis' });
    }

    try {
        // Vérifie si le groupe est déjà dans les favoris
        const [existingFavoris] = await mysqlClient.query(
            'SELECT * FROM Favoris WHERE groupe_id = ? AND user_id = (SELECT id FROM Users WHERE user_email = ?)',
            [groupeId, userEmail]
        );

        if (existingFavoris.length > 0) {
            // Si le groupe est déjà dans les favoris, on le supprime
            const [deleteResult] = await mysqlClient.query(
                'DELETE FROM Favoris WHERE groupe_id = ? AND user_id = (SELECT id FROM Users WHERE user_email = ?)',
                [groupeId, userEmail]
            );

            if (deleteResult.affectedRows > 0) {
                return res.status(200).json({ status: true, message: 'Groupe supprimé des favoris', statusGroupe: false });
            } else {
                return res.status(500).json({ status: false, message: 'Impossible de supprimer le groupe des favoris' });
            }
        } else {
            // Sinon, on ajoute le groupe aux favoris
            const [insertResult] = await mysqlClient.query(
                'INSERT INTO Favoris (groupe_id, user_id) VALUES (?, (SELECT id FROM Users WHERE user_email = ?))',
                [groupeId, userEmail]
            );

            if (insertResult.affectedRows > 0) {
                return res.status(201).json({ status: true, message: 'Groupe ajouté aux favoris', statusGroupe: true });
            } else {
                return res.status(500).json({ status: false, message: 'Impossible d\'ajouter le groupe aux favoris' });
            }
        }
    } catch (error) {
        console.error(error); // Log des erreurs côté serveur pour déboguer
        return res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});

module.exports = router; 