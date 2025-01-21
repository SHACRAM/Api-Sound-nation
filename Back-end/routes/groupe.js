const mysqlClient = require('../config/dbConfig');
const express = require("express");
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');
const router = express.Router();


/**
 * Route qui permet d'ajouter un groupe en base de données
 * @param {string} name - Nom du groupe
 * @param {number} hour - Heure de passage du groupe
 * @param {string} date - Date de passage du groupe
 * @param {number} scene - Numéro de la scène où se produira le groupe
 * @param {string} alt - Texte alternatif de l'image du groupe
 * @param {string} bio - Biographie du groupe
 * @param {file} imageGroupe - Image du groupe
 * @return {json} - Retourne un message de succès ou d'erreur et le statut de la requête
 */
router.post('/addGroupe', auth, multer.single('imageGroupe'), async (req, res) => {
    const { name, hour, date, scene, alt, bio } = req.body;

   

    const sql = 'INSERT INTO Groupe (groupe_name, groupe_hour, groupe_date, groupe_scene, groupe_image_name, groupe_image_path, groupe_image_alt, groupe_bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        if(!name || !hour || !date || !scene || !alt || !bio){
            throw new Error('FIELDS_REQUIRED');
        }
        if (!req.file) {
            throw new Error('Aucune image envoyée');
        }
    
        const imageName = req.file.originalname;
        const imagePath = req.file.path;

        const [result] = await mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt, bio]);

        res.status(201).json({ status: true, message: "Le groupe a bien été ajouté" });
    } catch (error) {
        if(error.message === 'Aucune image envoyée'){
            return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
        }
        if(error.message === 'FIELDS_REQUIRED'){
            return res.status(400).json({ status: false, message: 'Veuillez renseigner tous les champs' });
        }
        console.error("Erreur d'insertion dans la base de données:", error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});



/**
 * Route qui permet de récupérer tous les groupes du festival côté front
 * @param {object} req - Requête de l'utilisateur
 * @param {object} res - Réponse renvoyée à l'utilisateur
 * @return {json} - Retourne un message de succès ou d'erreur, le statut de la requête et les données des groupes
 */
router.get('/public/groupes', async (req, res) => {
    const sql = 'SELECT * FROM Groupe';

    try {
        const [result] = await mysqlClient.query(sql);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.error("Erreur dans la récupération des groupes:", error);
        res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});



/**
 * Route qui permet de récupérer tous les groupes du festival côté back-office
 * @param {object} req - Requête de l'utilisateur
 * @param {object} res - Réponse renvoyée à l'utilisateur
 * @return {json} - Retourne un message de succès ou d'erreur, le statut de la requête et les données des groupes
 */
router.get('/', auth, async (req, res) => {
    const sql = 'SELECT * FROM Groupe';

    try {
        const [result] = await mysqlClient.query(sql);
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.error("Erreur dans la récupération des groupes:", error);
        res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});


/**
 * Route qui permet de modifier un groupe
 * @param {number} id - ID du groupe à modifier
 * @param {string} name - Nom du groupe
 * @param {number} hour - Heure de passage du groupe
 * @param {string} date - Date de passage du groupe
 * @param {number} scene - Numéro de la scène où se produira le groupe
 * @param {string} alt - Texte alternatif de l'image du groupe
 * @param {string} bio - Biographie du groupe
 * @param {file} imageGroupe - Image du groupe
 * @return {json} - Retourne un message de succès ou d'erreur et le statut de la requête
 */
router.put('/:id', auth, multer.single('imageGroupe'), async (req, res) => {
    

    const { id } = req.params;
    const { name, hour, date, scene, alt, bio } = req.body;
    


    const sql = 'UPDATE Groupe SET groupe_name = ?, groupe_hour =?, groupe_date=?, groupe_scene=?, groupe_image_name=?, groupe_image_path=?, groupe_image_alt=?, groupe_bio=? WHERE id = ?';

    try {
        if(!name || !hour || !date || !scene || !alt || !bio){
            throw new Error('FIELDS_REQUIRED');
        }
        if (!req.file) {
            throw new Error('Aucune image envoyée');
        }
        const imageName = req.file.originalname;
        const imagePath = req.file.path;

        const [result] = await mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt, bio, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Groupe non trouvé' });
        }

        res.status(200).json({ status: true, message: 'Le groupe a bien été modifié' });
    } catch (error) {
        if(error.message === 'Aucune image envoyée'){
            return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
        }
        if(error.message === 'FIELDS_REQUIRED'){
            return res.status(400).json({ status: false, message: 'Veuillez renseigner tous les champs' });
        }
        console.error('Erreur dans la modification du groupe:', error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});


/**
 * Route qui permet de supprimer un groupe
 * @param {number} id - ID du groupe à supprimer
 * @return {json} - Retourne un message de succès ou d'erreur et le statut de la requête
 */
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Groupe WHERE id = ?';

    try {
        const [result] = await mysqlClient.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Groupe non trouvé' });
        }

        res.status(200).json({ status: true, message: 'Le groupe a bien été supprimé' });
    } catch (error) {
        console.error('Erreur dans la suppression du groupe:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la suppression du groupe' });
    }
});



/**
 * Route qui permet de récupérer un groupe par son ID
 * @param {number} id - ID du groupe à récupérer
 * @return {json} - Retourne un message de succès ou d'erreur, le statut de la requête et les données du groupe
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    

    const sql = 'SELECT * FROM Groupe WHERE id = ?';

    try {
        const [result] = await mysqlClient.query(sql, [id]);
        if (result.length === 0) {
            return res.status(404).json({ status: false, message: 'Groupe non trouvé' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (error) {
        console.error('Erreur lors de la récupération du groupe:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la récupération du groupe' });
    }
});








module.exports = router;