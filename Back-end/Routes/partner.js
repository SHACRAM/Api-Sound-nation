const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const router = express.Router();
const multer = require('../Middleware/multerConfig');

// Route qui permet d'ajouter un partenaire en base de données
router.post('/addPartner', multer.single('imagePartner'), async (req,res)=>{

    if (!req.file) {
        return res.status(400).json({ status: false, message: 'Aucune image envoyée' });
    }

    const {name, site, category, alt}= req.body;
    const imageName = req.file.originalname;
    const imagePath = req.file.path;

    const sql = 'INSERT INTO Partenaire (partner_name, partner_site, partner_category, partner_image_name, partner_image_path, partner_image_alt) VALUES (?, ?, ?, ?, ?, ?)';

    mysqlClient.query(sql, [name, site, category, imageName, imagePath, alt], (error, result)=>{
        if (error){
            res.status(400).json({status:false, message :'Merci de vérifier les informations saisies'})
        } else {
            res.status(201).json({status:true, message:'Le partenaire a bien été ajouté'})
        }
    })
})

// Route qui permet de récupérer tous les partenaires

router.get('/', (req,res)=>{
    const sql = 'SELECT * FROM Partenaire';

    mysqlClient.query(sql, (error, result)=>{
        if(error){
            res.status(500).json({status:false, message: 'Erreur serveur, merci d\'essayer ultérieurement'})
        }else{
            res.status(200).json({status: true, data: result})
        }
    })
})


// Route qui permet de modifier un partenaire
router.post('/modifyPartner', multer.single('imagePartner'), async (req,res)=>{
    const {id, name, site, category, alt} = req.body;

    if(!req.file){
        return res.status(400).json({status : false, message : 'Aucune image envoyée'})
    }

    const imageName = req.file.originalname;
    const imagePath = req.file.path;
    
    const sql = 'UPDATE Partenaire SET partner_name = ?, partner_site =?, partner_category=?, partner_image_name=?, partner_image_path=?, partner_image_alt=? WHERE id = ?';

    mysqlClient.query(sql, [name, site, category, imageName, imagePath, alt, id], (error, result)=>{
        if(error){
            res.status(400).json({status:false, message: 'Merci de vérifier les informations saisies'})
        } else {
            res.status(200).json({status:true, message:'Le groupe a bien été modifié'})
        }
    })
    })










module.exports = router;