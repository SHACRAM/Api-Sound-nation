const mysql = require('mysql2/promise');
require('dotenv').config();
//Connexion à la base de données
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    socketPath : process.env.DB_SOCKET_PATH,
    waitForConnections: true, 
    connectionLimit: process.env.DB_CONNECTION_LIMIT,      
    queueLimit: process.env.DB_QUEUE_LIMIT
    
});


(async () => {
    try {
        console.log('DB_HOST', process.env.DB_HOST)
        const connection = await db.getConnection();
        console.log('Connexion à la base de données réussie');
        connection.release(); 
    } catch (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
    }
})();

module.exports = db;


 