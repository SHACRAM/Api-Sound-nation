const mysqlClient = require('./Config/dbConfig');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

//Création d'un jeton JWT à partir des données fournies
const createTokenFromJson = (jsonData) => {
    try {
        //TODO enregistrer la clé secrète dans un fichier de configuration
      const secretKey = "secretKey";
      const token = jwt.sign(jsonData, secretKey);
      return token;
    } catch (error) {
      console.log("error :", error.message);
      return null;
    }
  };


//Route de connexion d'un utilisateur
router.post('/signin', async (req, res) => {
    const {identifiant, password} = req.body;

    const sql = 'SELECT * FROM Users WHERE user_name = ?';

    try{
        mysqlClient.query(sql, [identifiant], async (error, result)=>{
            if (error){
                res.status(401).json({status: false, message: 'Identifiants incorrects'})
            }

            if(result.length > 0){
                const user = result[0];
                const passwordMatch = await bcrypt.compare(password, user.user_password);

                if(passwordMatch){
                    const jsonData={
                        name : user.user_name,
                        role : user.user_role
                    }
                }
            }

            const token = createTokenFromJson(jsonData);

            if(token){
                res.status(200).json({
                    status : true, message : 'Connexion réussie', token : token, name : user.user_name
                })

            } else{
                res.status(401).json({
                    status : false, message : 'identfiants inconnus'
                })
            }
        })

    } catch (error){
        res.status(500).json({status : false, message :'Erreur serveur, merci d\'essayer ultérieurement'})

    }
});




