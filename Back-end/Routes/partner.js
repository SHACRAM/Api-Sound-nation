const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../Middleware/multerConfig');
const auth = require('../Middleware/auth');

// Route qui permet d'ajouter un partenaire en base de données
router.post('/addPartner', auth, multer.single('imagePartner'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const { name, site, category, alt } = req.body;
    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'INSERT INTO Partenaire (partner_name, partner_site, partner_category, partner_image_name, partner_image_path, partner_image_alt) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        await mysqlClient.query(sql, [name, site, category, imageName, imagePath, alt]);

        res.status(201).json({ status: true, message: 'Le partenaire a bien été ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du partenaire:', error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});

// Route qui permet de récupérer tous les partenaires
router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM Partenaire';

    try {
        const [result] = await mysqlClient.query(sql);

        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.error('Erreur lors de la récupération des partenaires:', error);
        res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});


// Route qui permet de modifier un partenaire
router.post('/modifyPartner', auth, multer.single('imagePartner'), async (req, res) => {
    const { id, name, site, category, alt } = req.body;

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'UPDATE Partenaire SET partner_name = ?, partner_site = ?, partner_category = ?, partner_image_name = ?, partner_image_path = ?, partner_image_alt = ? WHERE id = ?';

    try {
        const [result] = await mysqlClient.query(sql, [name, site, category, imageName, imagePath, alt, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Le partenaire a bien été modifié' });
        } else {
            res.status(404).json({ status: false, message: 'Le partenaire n\'a pas été trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la modification du partenaire:', error);
        res.status(500).json({ status: false, message: 'Erreur serveur, merci d\'essayer ultérieurement' });
    }
});










module.exports = router;