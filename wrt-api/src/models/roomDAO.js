const database = require('../helpers/database.js');

async function createRoom(users, game) {
    return new Promise(async (resolve, reject) => {
        let max = await getRoomMax();
        var itemsProcessed = 0;
        users.forEach(async user => {
            await addUserToRoom(user, max + 1, game);
            if(users.length -1 === itemsProcessed){
                resolve();
            }
            itemsProcessed++;
        });
    });
}

async function addUserToRoom(user, room, game) {
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

async function getUser(id) {
    
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms where roomId=?;";
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
    getUser
}