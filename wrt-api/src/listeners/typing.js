const userDAO = require('../models/userDAO');

module.exports = function (socket) {
    socket.on("typing", async function (room, id) {
        let user = await userDAO.getUser(id);
        socket.in(room).emit("user_typing", user.username);
    });
};