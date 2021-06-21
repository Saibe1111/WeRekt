const database = require('../helpers/database.js');

async function createMessage(user, room, game) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
    let sql = "INSERT INTO Rooms (user, roomId, game) values (?,?,?);";
    
    connection.query(sql, [user,room,game], (error) => {
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

async function getMessage(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms where user=?;";
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
    getMessage,
}