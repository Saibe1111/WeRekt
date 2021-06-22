const database = require('../helpers/database.js');

async function createMessage(content, timestamp, senderId,roomId) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
    let sql = "INSERT INTO Messages (content, timestamp, senderId, roomId) values (?,?,?,?);";
    
    connection.query(sql, [content, timestamp, senderId,roomId], (error) => {
        if (error) {
            console.error(error.message);
            resolve();
        } else {
            resolve();
        }
    });
    
    connection.end();
});
}

async function getRoomMessage(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        //let sql = "SELECT * FROM Messages where roomId=?;";
        let sql = "SELECT * FROM Messages INNER JOIN Users ON Messages.senderId = Users.ID where roomId=?;";
        connection.query(sql, [id], (error, results) => {
            
            if (error)
                console.error(error.message);
            if(results === undefined){
                resolve(null);
            }else if(results.length > 0){
                
                resolve(results);
            }else{
                resolve(null);
            }
            connection.end();
        });

    }).catch((error) => {
        console.log(error);
    });

}



module.exports = {
    createMessage,
    getRoomMessage,
}