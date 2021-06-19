module.exports = function (io) {
    io.on("connection", function (socket) {
        console.log("A user has just logged in!");
        
    });
};
