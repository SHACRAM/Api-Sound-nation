const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const multer = require('../Middleware/multerConfig');
const auth = require('../Middleware/auth');
const router = express.Router();



// Route qui permet d'ajouter un groupe en base de données
router.post('/addGroupe', auth, multer.single('imageGroupe'), async (req, res) => {
    const { name, hour, date, scene, alt, bio } = req.body;

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'INSERT INTO Groupe (groupe_name, groupe_hour, groupe_date, groupe_scene, groupe_image_name, groupe_image_path, groupe_image_alt, groupe_bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt, bio]);

        res.status(201).json({ status: true, message: "Le groupe a bien été ajouté" });
    } catch (error) {
        console.error("Erreur d'insertion dans la base de données:", error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});



// Récupérer tous les groupes du festival côté front
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


// Récupérer tous les groupes du festival côté back-office
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


// Route qui permet de modifier un groupe
router.post('/modifyGroupe', auth, multer.single('imageGroupe'), async (req, res) => {
    const { id, name, hour, date, scene, alt, bio } = req.body;

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'UPDATE Groupe SET groupe_name = ?, groupe_hour =?, groupe_date=?, groupe_scene=?, groupe_image_name=?, groupe_image_path=?, groupe_image_alt=?, groupe_bio=? WHERE id = ?';

    try {
        const [result] = await mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt, bio, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Groupe non trouvé' });
        }

        res.status(200).json({ status: true, message: 'Le groupe a bien été modifié' });
    } catch (error) {
        console.error('Erreur dans la modification du groupe:', error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});


// Route qui permet de supprimer un groupe
router.post('/deleteGroupe', auth, async (req, res) => {
    const { id } = req.body;

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

// Route qui permet de récupérer un groupe par son id
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