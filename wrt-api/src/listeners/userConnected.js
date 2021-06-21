module.exports = function (socket) {
    socket.on("user_connected", function () {
        let tab = [
            {
                id: "1",
                game: "Among Us",
                gameIcon:
                    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
            },
            {
                id: "2",
                game: "Among Us",
                gameIcon:
                    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
            },
        ];
        socket.emit("room", tab);
        let room = {
            id: "3",
            game: "Among Us",
            gameIcon:
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
        };
        socket.emit("room", room);

        //Messages

        let members = [
            {
                User_ID: "578957887108546571",
                username: "Vivi",
                profile_url:
                    "https://cdn.discordapp.com/avatars/578957887108546571/71714a0dbf66a6d85cbdb24953875d03.png",
            },
            {
                User_ID: "345823189449965579",
                username: "Antoinee",
                profile_url:
                    "https://cdn.discordapp.com/avatars/345823189449965579/a_9b9e67636f6a4154d7c277a8d5509053.png",
            },
            {
                User_ID: "283639048483110922",
                username: "Monica",
                profile_url:
                    "https://cdn.discordapp.com/avatars/283639048483110922/113cb2453cb70ef21a3212177956ae40.png",
            },
        ];

        let messages = [
            {
                content: "blablabla",
                timestamp: new Date(),
                sender: "Antoine",
                senderId: "345823189449965579",
            },
            {
                content: "mamamia como estas",
                timestamp: new Date(),
                sender: "Monica",
                senderId: "283639048483110922",
            },
            {
                content:
                    "AAAAAAAAAH qsqfsd fdsfs df sd fsdf sdf sdf sdf sdf dsefezfes s fzef sdf esfs fds frez fsdf ",
                timestamp: new Date(),
                sender: "Vivi",
                senderId: "578957887108546571",
            },
        ];
        socket.emit("room_Info", messages, members);
        let message = {
            content:
                "AAAAAAAAAH qsqfsd fdsfs df sd fsdf sdf sdf sdf sdf dsefezfes s fzef sdf esfs fds frez fsdf ",
            timestamp: new Date(),
            sender: "Vivi",
            senderId: "578957887108546571",
        };
        socket.emit("room_Info", message);
    });
};
