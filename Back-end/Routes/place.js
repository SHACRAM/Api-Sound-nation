const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../Middleware/multerConfig');


// Route qui permet d'ajouter un lieu en base de données
router.post('/addPlace', multer.fields([{name: 'images', maxCount: 2}]), async (req, res)=>{


if(!req.files || req.files['images'].length < 2){
    return res.status(400).json({status: false, message: 'Aucune image envoyée'});
}

const {name, category, latitude, longitude, markerDiametre, color, altLogo, altImage}= req.body;

const logoName = req.files['images'][0].originalname;
const logoPath = req.files['images'][0].path;
const imageName = req.files['images'][1].originalname;
const imagePath = req.files['images'][1].path;

const sql = 'INSERT INTO Lieu (place_name, place_category, place_latitude, place_longitude, place_marker_diametre, place_marker_color, place_logo_name, place_logo_path, place_logo_alt, place_image_name, place_image_path, place_image_alt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

mysqlClient.query(sql, [name, category, latitude, longitude, markerDiametre, color, logoName, logoPath, altLogo, imageName, imagePath, altImage], (error, result)=>{
    if(error){
        res.status(400).json({status : false, message : 'Merci de vérifier les informations saisies'})
    } else {

        res.status(201).json({status : true, message : 'Le lieu à bien été ajouté'})
    }
})
})


// Route qui permet de récupérer l'ensemble des lieux en base de données
router.get('/', (req,res)=>{

    const sql= 'SELECT * FROM Lieu';

    mysqlClient.query(sql, (error, result)=>{
        if(error){
            res.status(400).json({status : false, message :'Erreur lors de la récupération des données'})
        } else {
            res.status(200).json({status : true, data : result})
        }
    })
})


// Route qui permet de supprimer un lieu en base de données
router.post('/deletePlace', (req, res)=>{

    const {id}= req.body;

    const sql = 'DELETE FROM Lieu WHERE id=?';

    mysqlClient.query(sql, [id], (error, result)=>{

        if(error){
            res.status(400).json({status: false, message: 'Erreur lors de la suppression du lieu'})
        }else{
            res.status(200).json({status: true, message:'Le lieu à bien été supprimé'})
        }
    })
})




// Route qui permet de modifier un lieu en base de données
router.post('/modifyPlace', multer.fields([{name: 'images', maxCount: 2}]), async (req, res)=>{

    if(!req.files || req.files['images'].length < 2){
        return res.status(400).json({status: false, message: 'Aucune image envoyée'});
    }

    const {id, name, category, latitude, longitude, markerDiametre, color, altLogo, altImage}= req.body;

    const logoName = req.files['images'][0].originalname;
    const logoPath = req.files['images'][0].path;
    const imageName = req.files['images'][1].originalname;
    const imagePath = req.files['images'][1].path;

    const sql = 'UPDATE Lieu SET place_name=?, place_category=?, place_latitude=?, place_longitude=?, place_marker_diametre=?, place_marker_color=?, place_logo_name=?, place_logo_path=?, place_logo_alt=?, place_image_name=?, place_image_path=?, place_image_alt=? WHERE id=?';

    mysqlClient.query(sql, [name, category, latitude, longitude, markerDiametre, color, logoName, logoPath, altLogo, imageName, imagePath, altImage, id], (error, result)=>{

        if(error){
            res.status(400).json({status: false, message: 'Erreur lors de la modification du lieu'})
        } else{
            res.status(200).json({status: true, message : 'Le lieu à bien été modifié'})
        }
    })
})










module.exports = router;


