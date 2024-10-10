const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../Middleware/multerConfig');


//Route qui permet d'ajouter un groupe en base de données
router.post('/addGroupe', multer.single('imageGroupe'), async (req,res)=>{
    const {name, hour, date, scene, alt} = req.body;

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'INSERT INTO Groupe (groupe_name, groupe_hour, groupe_date, groupe_scene, groupe_image_name, groupe_image_path, groupe_image_alt) VALUES (?, ?, ?, ?, ?, ?, ?)';
    mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt], (error, result)=>{
        if(error){
            res.status(400).json({status: false, message: 'Merci de vérifier les informations saisies'});
        } else{
            res.status(201).json({status: true, message:"Le groupe a bien été ajouté"});
        }
    })
})

module.exports = router;