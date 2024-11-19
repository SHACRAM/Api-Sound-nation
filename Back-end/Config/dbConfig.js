const mysql = require('mysql2/promise');
//Connexion à la base de données
const db = mysql.createPool({
    host: 'localhost',
    user : 'root',
    password: 'root',
    database : 'Sound-nation',
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    waitForConnections: true, 
    connectionLimit: 10,      
    queueLimit: 0
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connexion à la base de données réussie');
        connection.release(); 
    } catch (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
    }
})();

module.exports = db;


 