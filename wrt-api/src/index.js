require("./strategies/discord");

const express = require("express");
const passport = require("passport");
const app = express();
const config = require("./config.json");
const routes = require("./routes");
const session = require("express-session");
const cors = require('cors');

app.use( cors({
    origin: ['https://werekt.cuvellier.fr'],
    credentials: true,
}));

app.use( session({
    secret: 'secret-key',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    name: "discord-auth"
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);

app.listen(config.express.PORT, () => {
    console.log(`The server is listening on port: ${config.express.PORT}`);
});
