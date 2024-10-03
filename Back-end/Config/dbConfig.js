const mysql = require('mysql');
//Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'root',
    database : 'Sound-nation',
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
});

db.connect((err)=>{
    if(err){
        console.error('Erreur lors de la connexion à la base de données' + err.stack)
        return
    }
    console.log('Connexion à la base de données réussie')
})

module.exports = db;


