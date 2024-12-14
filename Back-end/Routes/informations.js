const mysqlClient = require('../Config/dbConfig');
const express = require("express");
const multer = require('../Middleware/multerConfig');
const auth = require('../Middleware/auth');
const { error } = require('console');
const router = express.Router();



// Route qui permet d'ajouter une question / réponse en base de données
router.post('/addFaq', auth, async (req,res)=>{
    const {question, reponse} = req.body;
    const sql = 'INSERT INTO Faq (question, reponse) VALUES (?,?)';

    

    try{
        if(!question || !reponse){
            throw new Error('CHAMP MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [question, reponse]);

        if(result.affectedRows === 1){
            console.log('enttrée dans la fonction')
            res.status(201).json({status:true, message:'La question / réponse a bien été ajoutée'});
        }

    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'});
    } else{
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer plus tard'});
    }
    }
})

// Route qui permet de récupérer toutes les questions / réponses en base de données coté back
router.get('/faq', auth, async (req,res)=>{

    const sql = 'SELECT * FROM Faq';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch(error){
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})

// Route qui permet de récupérer toutes les questions / réponses en base de données coté front
router.get('/public/faq',  async (req,res)=>{

    const sql = 'SELECT * FROM Faq';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch{
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})


// Route qui permet de modifier une question / réponse en base de données
router.post('/modifyFaq', auth, async (req,res)=>{

    const {id, question, reponse} = req.body;
    const sql = 'UPDATE Faq SET question =? , reponse = ? WHERE id =?';
        

    try{
        if(!id || !question || !reponse){
            throw new Error('CHAMP MANQUANT');
        }
        const [result] = await mysqlClient.query(sql, [question, reponse, id]);

        if(result.affectedRows === 1){
            res.status(200).json({status:true, message:'La question / réponse a bien été modifiée'});
        }

    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'});
        } else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
})

// Route qui permet de supprimer une question / réponse en base de données
router.post('/deleteFaq', auth, async (req,res)=>{
    const {id} = req.body;
    const sql = 'DELETE FROM Faq WHERE id = ?';


    try{

    if(!id){
        throw new Error('ID MANQUANT');
    }
        const [result] = await mysqlClient.query(sql, [id]);
        if(result.affectedRows === 1){
            res.status(200).json({status:true, message:'La question / réponse a bien été supprimée'});
        }

    }catch(error){
        if(error.message === 'ID MANQUANT'){
            res.status(400).json({status:false, message:'Merci de renseigner un id'});
        }else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
})


// Route qui permet d'ajouter une information pratique en base de données
router.post('/addInfoPratique', auth, async (req,res)=>{
    const {title, information} = req.body;

    const sql='INSERT INTO InfoPratique (title, information) VALUES (?,?)';

    

    try{
        if(!title || !information){
            throw new Error('CHAMP MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [title, information]);
        if(result.affectedRows === 1){
            res.status(201).json({status:true, message:'L\'information pratique a bien été ajoutée'});
        }

    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'});
        } else {
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
})


// Route qui permet de récupérer toutes les informations pratiques en base de données côté back
router.get('/getInfoPratique', auth, async (req,res)=>{
    const sql = 'SELECT * FROM InfoPratique';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch(error){
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})

// Route qui permet de récupérer toutes les informations pratiques en base de données côté front
router.get('/public/getInfoPratique', async (req,res)=>{
    const sql = 'SELECT * FROM InfoPratique';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch(error){
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})


// Route qui permet de modifier une information pratique en base de données
router.post('/modifyInfoPratique', auth, async (req,res)=>{
    const {id, title, information} = req.body;
    const sql = 'UPDATE InfoPratique SET title = ? , information = ? WHERE id = ?';

    

    try{
        if(!id || !title || !information){
            throw new Error('CHAMP MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [title, information, id]);
        if(result.affectedRows === 1){
            res.status(200).json({status:true, message:'L\'information pratique a bien été modifiée'});
        }

    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'});
        } else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
});

// Route qui permet de supprimer une information pratique en base de données
router.post('/deleteInfoPratique', auth, async (req,res)=>{
    const {id} = req.body;
    const sql ='DELETE FROM InfoPratique WHERE id =?';

   

    try{
        if(!id){
            throw new Error('ID MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [id]);
        if(result.affectedRows === 1){
            res.status(200).json({status:true, message:'L\'information pratique a bien été supprimée'});
        }

    }catch(error){
        if(error.message === 'ID MANQUANT'){
            res.status(400).json({status:false, message:'Merci de renseigner un id'});
        } else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
})


// Route qui permet d'ajouter une cgu, un cookie ou des données personnelles en base de données
router.post('/addCguCookie', auth, async (req,res)=>{
    const {cat, title, content} = req.body;
    const sql='INSERT INTO CguCookie (category, title, content) VALUES (?,?,?)';

   
    try{
        if(!cat || !title || !content || cat === ''){
            throw new Error('CHAMP MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [cat, title, content]);
        if (result.affectedRows === 1) {
            if (cat === 'cgu') {
                return res.status(201).json({ status: true, message: 'La cgu a bien été ajoutée' });
            } else if (cat === 'cookie') {
                return res.status(201).json({ status: true, message: 'Le cookie a bien été ajouté' });
            } else {
                return res.status(201).json({ status: true, message: 'Les données personnelles ont bien été ajoutées' });
            }
        }

    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'});
        }else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
        }
    }
})

// Route qui permet de récupérer toutes les cgu et cookies en base de données côté back
router.get('/getCguCookie', auth, async (req, res)=>{
    const sql = 'SELECT * FROM CguCookie';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch(error){
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})

// Route qui permet de récupérer toutes les cgu et cookies en base de données côté front
router.get('/public/getCguCookie', async (req, res)=>{
    const sql = 'SELECT * FROM CguCookie';

    try{
        const [result] = await mysqlClient.query(sql);
        if(result.length > 0){
            res.status(200).json({status:true, data:result});
        }
    }catch(error){
        console.error('Erreur:', error.message);
        res.status(500).json({status:false, message:'Erreur serveur merci de réessayer ultérieurement'});
    }
})

// Route qui permet de supprimer des cgu ou cookies en base de données
router.post('/deleteCguCookie', auth, async (req,res)=>{
    const {id, cat} = req.body;
    const sql = 'DELETE FROM CguCookie WHERE id =?';

    

    try{
        if(!id || !cat){
            throw new Error('CHAMPS MANQUANT')
        }

        const [result] = await mysqlClient.query(sql, [id]);
        if(result.affectedRows === 1 && cat === 'cgu'){
            res.status(200).json({status : true, message:'La CGU à été supprimée'})
        } else if(result.affectedRows === 1 && cat === 'cookie'){
            res.status(200).json({status: true, message:'Le cookie à bien été supprimé'})
        }else {
            res.status(200).json({status: true, message:'La donnée personnelle à bien été supprimé'})
        }
    }catch(error){
        if(error.message === 'CHAMPS MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'})
        }else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur, merci d\'essayer ultérieurement'})
        }
    }
})

// Route qui permet de modifier une cgu ou un cookie en base de données
router.post('/modifyCguCookie', auth, async (req,res)=>{
    const {id, cat, title, content} = req.body;
    const sql = 'UPDATE CguCookie SET category = ?, title = ?, content = ? WHERE id = ?';

    
    try{
        if(!id || !cat || !title || !content){
            throw new Error('CHAMPS MANQUANT')
        }

        const [result] = await mysqlClient.query(sql, [cat, title, content, id]);
        if (result.affectedRows > 0) {
            switch(cat){
                case 'cgu':
                    return res.status(200).json({ status: true, message: 'La CGU a bien été modifiée' });
                case 'cookie':
                    return res.status(200).json({ status: true, message: 'Le cookie a bien été modifié' });
                case 'pData':
                    return res.status(200).json({ status: true, message: 'Les données personnelles ont bien été modifiées' });
            }
        } 
    }catch(error){
        if(error.message === 'CHAMPS MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'})
        }else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur, merci d\'essayer ultérieurement'})
        }
    }
})




















module.exports = router;
