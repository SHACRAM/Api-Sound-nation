const mysqlClient = require('../config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');



/**
 * Route qui permet d'ajouter un lieu en base de données
 * @param {string} name - Nom du lieu
 * @param {string} category - Catégorie du lieu
 * @param {string} latitude - Latitude du lieu
 * @param {string} longitude - Longitude du lieu
 * @param {string} markerDiametre - Diamètre du marqueur
 * @param {string} color - Couleur du marqueur
 * @param {string} altLogo - Texte alternatif pour le logo
 * @param {string} altImage - Texte alternatif pour l'image
 * @param {string} info - Informations sur le lieu
 * @param {file} images - Images du lieu
 * @param {file} images - Logo du lieu
 * @return {json} - Message de succès ou d'erreur ainsi que le statut de la requête
 */
router.post('/addPlace', auth, multer.fields([{ name: 'images', maxCount: 2 }]), async (req, res) => {

    
    if (!req.files || !req.files['images'] || req.files['images'].length < 2) {
        return res.status(400).json({ status: false, message: 'Vous devez envoyer au moins 2 fichiers.' });
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
        res.status(400).json({ status: false, message: 'Merci de vérifier les informations saisies' });}
});



/**
 * Route qui permet de récupérer l'ensemble des lieux en base de données coté back-office
 * @param {object} req - Requête de l'utilisateur
 * @param {object} res - Réponse renvoyée à l'utilisateur
 * @return {json} - Liste des lieux en base de données ainsi que le statut de la requête
 */
router.get('/',auth, async (req, res) => {
    const sql = 'SELECT * FROM Lieu';

    try {
        const [result] = await mysqlClient.query(sql);

        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Erreur lors de la récupération des données' });
    }
});


/**
 * Route qui permet de récupérer l'ensemble des lieux en base de données coté front
 * @param {object} req - Requête de l'utilisateur
 * @param {object} res - Réponse renvoyée à l'utilisateur
 * @return {json} - Liste des lieux en base de données ainsi que le statut de la requête
 */
router.get('/places/public', async (req, res) => {
    const sql = 'SELECT * FROM Lieu';

    try {
        const [result] = await mysqlClient.query(sql);

        res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.error('Erreur lors de la récupération des lieux:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la récupération des données' });
    }
});



/**
 * Route qui permet de supprimer un lieu en base de données
 * @param {number} id - ID du lieu à supprimer
 * @return {json} - Message de succès ou d'erreur ainsi que le statut de la requête
 */
router.delete('/place/:id', auth, async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Lieu WHERE id = ?';
    

    try {
        if(!id){
            throw new Error('NO ID');
        }
        const [result] = await mysqlClient.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Le lieu a bien été supprimé' });
        } else {
            res.status(404).json({ status: false, message: 'Aucun lieu trouvé avec cet ID' });
        }
    } catch (error) {
        if(error.message === 'NO ID'){
            return res.status(400).json({ status: false, message: 'Aucun ID envoyé' });
        } else{
        console.error('Erreur lors de la suppression du lieu:', error);
        res.status(400).json({ status: false, message: 'Erreur lors de la suppression du lieu' });
        }
    }
});


/**
 * Route qui permet de modifier un lieu en base de données
 * @param {number} id - ID du lieu à modifier
 * @param {string} name - Nom du lieu
 * @param {string} category - Catégorie du lieu
 * @param {string} latitude - Latitude du lieu
 * @param {string} longitude - Longitude du lieu
 * @param {string} markerDiametre - Diamètre du marqueur
 * @param {string} color - Couleur du marqueur
 * @param {string} altLogo - Texte alternatif pour le logo
 * @param {string} altImage - Texte alternatif pour l'image
 * @param {string} info - Informations sur le lieu
 * @param {file} images - Images du lieu
 * @param {file} images - Logo du lieu
 * @return {json} - Message de succès ou d'erreur ainsi que le statut de la requête
 */
router.put('/place/:id', auth, multer.fields([{ name: 'images', maxCount: 2 }]), async (req, res) => {

    const {name, category, latitude, longitude, markerDiametre, color, altLogo, altImage, info } = req.body;
    const { id } = req.params;

    

    const sql = 'UPDATE Lieu SET place_name=?, place_category=?, place_latitude=?, place_longitude=?, place_marker_diametre=?, place_marker_color=?, place_logo_name=?, place_logo_path=?, place_logo_alt=?, place_image_name=?, place_image_path=?, place_image_alt=?, place_info_popup=? WHERE id=?';

    try {
        if (!req.files || req.files['images'].length < 2) {
            throw new Error('IMAGE MISSING');
        }
        
        const logoName = req.files['images'][0].originalname;
        const logoPath = req.files['images'][0].path;
        const imageName = req.files['images'][1].originalname;
        const imagePath = req.files['images'][1].path;

        const [result] = await mysqlClient.query(sql, [name, category, latitude, longitude, markerDiametre, color, logoName, logoPath, altLogo, imageName, imagePath, altImage, info, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Le lieu a bien été modifié' });
        } else {
            res.status(404).json({ status: false, message: 'Aucun lieu trouvé avec cet ID' });
        }
    } catch (error) {
        if(error.message === 'IMAGE MISSING'){
            return res.status(400).json({ status: false, message: 'Vous devez envoyer au moins 2 images.' });
        }else{
            console.error('Erreur lors de la modification du lieu:', error);
            res.status(500).json({ status: false, message: 'Erreur serveur lors de la modification du lieu' });
        }  
    }
});



module.exports = router;


