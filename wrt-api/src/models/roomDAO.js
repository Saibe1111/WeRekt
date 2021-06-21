const { createPool } = require('mysql2/promise');
const database = require('../helpers/database.js');

async function createRoom(users) {
    return new Promise(async (resolve, reject) => {
        let max = await getRoomMax();
        var itemsProcessed = 0;
        users.forEach(async user => {
            await addUserToRoom(user, max + 1);
            if(users.length -1 === itemsProcessed){
                resolve();
            }
            itemsProcessed++;
        });
    });
}

async function addUserToRoom(user, room) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
    let sql = "INSERT INTO Rooms (user, roomId) values (?,?);";
    
    connection.query(sql, [user,room], (error) => {
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

async function getRooms(id) {
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

async function getRoomMax() {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms ORDER BY roomId DESC;";
        connection.query(sql, [], (error, results) => {
            if (error)
                console.error(error.message);
            if(results === undefined){
                resolve(null);
            }else if(results.length > 0){
                resolve(results[0].roomId);
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
    getRooms,
    createRoom,
}