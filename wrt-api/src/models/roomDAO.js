const database = require('../helpers/database.js');


async function createRoom(users, game) {
    
    return new Promise(async (resolve, reject) => {
        let max = await getRoomMax();
        var itemsProcessed = 0;
        users.forEach(async user => {
            await addUserToRoom(user, max + 1, game);
            if (users.length - 1 === itemsProcessed) {
                resolve();
            }
            itemsProcessed++;
        });
    });
}

async function addUserToRoom(user, room, game) {
    
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Rooms (user, roomId, game) values (?,?,?);";
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection AddUserToRoom error", error.message);
                reject(error);
            }
            connection.query(sql, [user, room, game], (error) => {
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

async function getRooms(id) {
    
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms where user=?;";
        database.getConnection((error, connection) => {
            if (error)
                reject(error);
            connection.query(sql, [id], (error, results) => {
                connection.release();
                if (error)
                    console.error(error.message);
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

async function getUser(id) {

    
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms where roomId=?;";
        database.getConnection((error, connection) => {
            if (error) reject(error);
            connection.query(sql, [id], (error, results) => {
                connection.release();
                if (error)
                    console.error(error.message);
                if (results === undefined) {
                    resolve(null);
                } else if (results.length > 0) {
                    resolve(results);
                } else {
                    resolve(null);
                }

            });
        })

    }).catch((error) => {
        console.log(error);
    });
}

async function getRoomMax() {
    
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Rooms ORDER BY roomId DESC;";
        database.getConnection((error, connection) => {
            if(error){
                reject(error);
            }
            connection.query(sql, [], (error, results) => {
                if (error)
                    console.error(error.message);
                if (results === undefined) {
                    resolve(null);
                } else if (results.length > 0) {
                    resolve(results[0].roomId);
                } else {
                    resolve(null);
                }

            });
        })

    }).catch((error) => {
        console.log(error);
    });

}


module.exports = {
    getRooms,
    createRoom,
    getUser
}