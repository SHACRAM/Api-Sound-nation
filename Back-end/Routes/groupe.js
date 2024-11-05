const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const multer = require('../Middleware/multerConfig');
const auth = require('../Middleware/auth');
const router = express.Router();



//Route qui permet d'ajouter un groupe en base de données
router.post('/addGroupe',auth, multer.single('imageGroupe'), async (req,res)=>{
    const {name, hour, date, scene, alt, bio} = req.body;

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'INSERT INTO Groupe (groupe_name, groupe_hour, groupe_date, groupe_scene, groupe_image_name, groupe_image_path, groupe_image_alt, groupe_bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt, bio], (error, result)=>{
        if(error){
            res.status(400).json({status: false, message: 'Merci de vérifier les informations saisies'});
        } else{
            res.status(201).json({status: true, message:"Le groupe a bien été ajouté"});
        }
    })
})



// Récupérer tous les groupes du festival
router.get('/', (req, res)=>{
    const sql = 'SELECT * FROM Groupe'

    mysqlClient.query(sql, (error, result)=>{
        if(error){
            res.status(500).json({status : false, message: 'Erreur serveur, merci d\'essayer ultérieurement'})
        } else{
            res.status(200).json({status: true, data: result})
        }
    })
})


//Route qui permet de modifier un groupe
router.post('/modifyGroupe',auth, multer.single('imageGroupe'), async (req,res)=>{
    const {id, name, hour, date, scene, alt, bio} = req.body;

    if(!req.file){
        return res.status(400).json({status : false, message : 'Aucune image envoyée'})
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;
    
    const sql = 'UPDATE Groupe SET groupe_name = ?, groupe_hour =?, groupe_date=?, groupe_scene=?, groupe_image_name=?, groupe_image_path=?, groupe_image_alt=?, groupe_bio=? WHERE id = ?';

    mysqlClient.query(sql, [name, hour, date, scene, imageName, imagePath, alt,bio,  id], (error, result)=>{
        if(error){
            res.status(400).json({status:false, message: 'Merci de vérifier les informations saisies'})
        } else {
            res.status(200).json({status:true, message:'Le groupe a bien été modifié'})
        }
    })
    })


//Route qui permet de supprimer un groupe
router.post('/deleteGroupe',auth, (req, res)=>{
    const {id} = req.body;

    const sql = 'Delete FROM Groupe WHERE id =?';

    mysqlClient.query(sql, [id], (error, result)=>{

        if(error){
            res.status(400).json({status: false, message: 'Erreur lors de la suppression du groupe'})
        }else{
            res.status(200).json({status : true, message: 'Le groupe a bien été surpprimé'})
        }
    })

})








module.exports = router;