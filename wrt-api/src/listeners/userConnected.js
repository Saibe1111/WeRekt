const getRoom = require("../events/getRoom");
module.exports = function (socket) {
    socket.on("user_connected", function (user) {
        if(user !== null){
            getRoom(socket, user);
        }
        
        //Messages

        let members = [
            {
                User_ID: "578957887108546571",
            },
            {
                User_ID: "345823189449965579",
            },
            {
                User_ID: "283639048483110922",
            },
        ];

        let messages = [
            {
                content: "Coucou",
                timestamp: new Date(),
                sender: "Antoine",
                senderId: "345823189449965579",
            },
            {
                content: "Coucou",
                timestamp: new Date(),
                sender: "Monica",
                senderId: "283639048483110922",
            },
            {
                content:
                    "Hey !",
                timestamp: new Date(),
                sender: "Seb",
                senderId: "181782320494280704",
            },
        ];
        socket.emit("room_Info", messages, members);
        let message = {
            content:
                "cv ?",
            timestamp: new Date(),
            sender: "Vivi",
            senderId: "578957887108546571",
        };
        socket.emit("room_Info", message);
    });
};
