const mysqlClient = require('../config/dbConfig');
const express = require("express");
const multer = require('../middleware/multerConfig');
const auth = require('../middleware/auth');
const { error } = require('console');
const router = express.Router();



/**
 * Route qui permet d'ajouter une question / réponse en base de données
 * @param {string} question - La question posée
 * @param {string} reponse - La réponse à la question posée
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.post('/addFaq', auth, async (req,res)=>{
    const {question, reponse} = req.body;
    const sql = 'INSERT INTO Faq (question, reponse) VALUES (?,?)';

    

    try{
        if(!question || !reponse){
            throw new Error('CHAMP MANQUANT');
        }

        const [result] = await mysqlClient.query(sql, [question, reponse]);

        if(result.affectedRows === 1){
            console.log('entrée dans la fonction')
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


/**
 * Route qui permet de récupérer toutes les questions / réponses en base de données côté back
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les questions / réponses en base de données ainsi que le statut de la requête
 */
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


/**
 * Route qui permet de récupérer toutes les questions / réponses en base de données côté front
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les questions / réponses en base de données ainsi que le statut de la requête
 */
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


/**
 * Route qui permet de modifier une question / réponse en base de données
 * @param {number} id - L'id de la question / réponse à modifier
 * @param {string} question - La question modifiée
 * @param {string} reponse - La réponse à modifiée
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.put('/:id', auth, async (req,res)=>{

    const {question, reponse} = req.body;
    const {id} = req.params;
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


/**
 * Route qui permet de supprimer une question / réponse en base de données
 * @param {number} id - L'id de la question / réponse à supprimer
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.delete('/:id', auth, async (req,res)=>{
    const {id} = req.params;
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



/**
 * Route qui permet d'ajouter une information pratique en base de données
 * @param {string} title - Le titre de l'information pratique
 * @param {string} information - L'information pratique
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
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



/**
 * Route qui permet de récupérer toutes les informations pratiques en base de données côté back
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les informations pratiques en base de données ainsi que le statut de la requête
 */
router.get('/', auth, async (req,res)=>{
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


/**
 * Route qui permet de récupérer toutes les informations pratiques en base de données côté front
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les informations pratiques en base de données ainsi que le statut de la requête
 */
router.get('/public', async (req,res)=>{
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



/**
 * Route qui permet de modifier une information pratique en base de données
 * @param {number} id - L'id de l'information pratique à modifier
 * @param {string} title - Le titre de l'information pratique modifiée
 * @param {string} information - L'information pratique modifiée
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.put('/infoPratique/:id', auth, async (req,res)=>{
    const {title, information} = req.body;
    const {id} = req.params;
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


/**
 * Route qui permet de supprimer une information pratique en base de données
 * @param {number} id - L'id de l'information pratique à supprimer
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.delete('/infoPratique/:id', auth, async (req,res)=>{
    const {id} = req.params;
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


/**
 * Route qui permet d'ajouter une cgu, un cookie ou des données personnelles en base de données
 * @param {string} cat - La catégorie du contenu ( cgu, cookie ou données personnelles)
 * @param {string} title - Le titre du contenu
 * @param {string} content - Le contenu
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
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


/**
 * Route qui permet de récupérer toutes les cgu et cookies en base de données côté back
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les cgu et cookies en base de données ainsi que le statut de la requête
 */
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


/**
 * Route qui permet de récupérer toutes les cgu et cookies en base de données côté front
 * @param {object} req - Les informations de la requête
 * @param {object} res - Les informations de la réponse
 * @return {json} - Les cgu et cookies en base de données ainsi que le statut de la requête
 */
router.get('/getCguCookie/public', async (req, res)=>{
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


/**
 * Route qui permet de supprimer une cgu, un cookie ou des données personnelles en base de données
 * @param {number} id - L'id de la cgu, du cookie ou des données personnelles à supprimer
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.delete('/cguCookie/:id', auth, async (req,res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM CguCookie WHERE id =?';

    

    try{
        if(!id || isNaN(id)){
            throw new Error('CHAMP MANQUANT')
        }
        const [result] = await mysqlClient.query(sql, [id]);
        if(result.affectedRows === 1 ){
            res.status(200).json({status:true, message:'La ressource a bien été supprimé'})
        }
    }catch(error){
        if(error.message === 'CHAMP MANQUANT'){
            res.status(400).json({status:false, message:'Merci de remplir tous les champs'})
        }else{
            console.error('Erreur:', error.message);
            res.status(500).json({status:false, message:'Erreur serveur, merci d\'essayer ultérieurement'})
        }
    }
})


/**
 * Route qui permet de modifier une cgu, un cookie ou des données personnelles en base de données
 * @param {number} id - L'id de la cgu, du cookie ou des données personnelles à modifier
 * @param {string} cat - La catégorie du contenu ( cgu, cookie ou données personnelles)
 * @param {string} title - Le titre du contenu modifié
 * @param {string} content - Le contenu modifié
 * @return {json} - Un message de confirmation ou d'erreur ainsi que le statut de la requête
 */
router.put('/cguCookie/:id', auth, async (req,res)=>{
    const {cat, title, content} = req.body;
    const {id} = req.params;
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
