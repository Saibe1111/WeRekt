require("./strategies/discord");

const express = require("express");
const passport = require("passport");
const app = express();
const config = require("./config.json");
const routes = require("./routes");
const session = require("express-session");
const cors = require("cors");
const database = require("./helpers/database.js");
const { isAuthorized } = require("./middlewares/auth.js");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080"
    },
});
const initListeners = require("./listeners");

database.checkDbExist();

app.use(
    cors({
        origin: ["http://localhost:8080", "https://werekt.cuvellier.fr"],
        credentials: true,
    })
);

app.use(
    session({
        secret: config.encryption_key.SESSION,
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        resave: false,
        saveUninitialized: false,
        name: "discord-auth",
    })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);
app.use("/public", isAuthorized, express.static(__dirname + "/public"));

app.use(
    "/socket.io",
    express.static(__dirname + "/../node_modules/socket.io/client-dist")
);

initListeners(io);

http.listen(config.express.PORT, () => {
    console.log(`The server is listening on port: ${config.express.PORT}`);
});
