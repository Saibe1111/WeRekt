const database = require('../helpers/database.js');


async function createMessage(content, timestamp, senderId, roomId) {
    
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Messages (content, timestamp, senderId, roomId) values (?,?,?,?);";
        database.getConnection((error, connection) => {
            if(error){
                console.error("database connection createMessage error");
                reject(error);
            }
            connection.query(sql, [content, timestamp, senderId, roomId], (error) => {
                connection.release();
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

    });
}

async function getRoomMessage(id) {
    
    return new Promise((resolve, reject) => {
        
        let sql = "SELECT * FROM Messages INNER JOIN Users ON Messages.senderId = Users.ID where roomId=? ORDER BY timestamp;";
        database.getConnection((error, connection) => {
            if(error){
                console.error("database connection getRoomMessage error");
                reject(error);
            }
            connection.query(sql, [id], (error, results) => {
                connection.release();
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                if (results === undefined) {
                    resolve(null);
                } else if (results.length > 0) {

                    resolve(results);
                } else {
                    resolve(null);
                }

            });
        });

    }).catch((error) => {
        console.log(error);
    });

}



module.exports = {
    createMessage,
    getRoomMessage,
}