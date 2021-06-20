module.exports = (io) => {
    const fs = require("fs");
    const path = require("path");

    const listenersPath = path.resolve(__dirname);

    io.on("connection", function (socket) {
        fs.readdir(listenersPath, (err, files) => {
            if (err) {
                process.exit(1);
            }
    
            files.map((fileName) => {
                if (fileName !== "index.js") {
                    //console.debug("Initializing listener at: %s", fileName);
                    const listener = require(path.resolve(__dirname, fileName));
                    listener(socket);
                }
            });
        });
    });

    
};
