const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../Middleware/multerConfig');
const auth = require('../Middleware/auth');


// Route qui permet d'ajouter un lieu en base de données
router.post('/addPlace', auth, multer.fields([{ name: 'images', maxCount: 2 }]), async (req, res) => {

    if (!req.files || req.files['images'].length < 2) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const { name, category, latitude, longitude, markerDiametre, color, altLogo, altImage, info } = req.body;

    const logoName = req.files['images'][0].originalname;
    const logoPath = req.files['images'][0].path;
    const imageName = req.files['images'][1].originalname;
    const imagePath = req.files['images'][1].path;

    const sql = 'INSERT INTO Lieu (place_name, place_category, place_latitude, place_longitude, place_marker_diametre, place_marker_color, place_logo_name, place_logo_path, place_logo_alt, place_image_name, place_image_path, place_image_alt, place_info_popup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await mysqlClient.query(sql, [name, category, latitude, longitude, markerDiametre, color, logoName, logoPath, altLogo, imageName, imagePath, altImage, info]);

        res.status(201).json({ status: true, message: 'Le lieu a bien été ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du lieu:', error);
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });
    }
});


// Route qui permet de récupérer l'ensemble des lieux en base de données
router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM Lieu';

    try {
        const [result] = await mysqlClient.query(sql);

        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.error('Erreur lors de la récupération des lieux:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la récupération des données' });
    }
});


// Route qui permet de supprimer un lieu en base de données
router.post('/deletePlace', auth, async (req, res) => {
    const { id } = req.body;

    const sql = 'DELETE FROM Lieu WHERE id = ?';

    try {
        const [result] = await mysqlClient.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Le lieu a bien été supprimé' });
        } else {
            res.status(404).json({ status: false, message: 'Aucun lieu trouvé avec cet ID' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du lieu:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la suppression du lieu' });
    }
});




// Route qui permet de modifier un lieu en base de données
router.post('/modifyPlace', auth, multer.fields([{ name: 'images', maxCount: 2 }]), async (req, res) => {

    if (!req.files || req.files['images'].length < 2) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const { id, name, category, latitude, longitude, markerDiametre, color, altLogo, altImage, info } = req.body;

    const logoName = req.files['images'][0].originalname;
    const logoPath = req.files['images'][0].path;
    const imageName = req.files['images'][1].originalname;
    const imagePath = req.files['images'][1].path;

    const sql = 'UPDATE Lieu SET place_name=?, place_category=?, place_latitude=?, place_longitude=?, place_marker_diametre=?, place_marker_color=?, place_logo_name=?, place_logo_path=?, place_logo_alt=?, place_image_name=?, place_image_path=?, place_image_alt=?, place_info_popup=? WHERE id=?';

    try {
        const [result] = await mysqlClient.query(sql, [name, category, latitude, longitude, markerDiametre, color, logoName, logoPath, altLogo, imageName, imagePath, altImage, info, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Le lieu a bien été modifié' });
        } else {
            res.status(404).json({ status: false, message: 'Aucun lieu trouvé avec cet ID' });
        }
    } catch (error) {
        console.error('Erreur lors de la modification du lieu:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la modification du lieu' });
    }
});










module.exports = router;


