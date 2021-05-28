const express = require("express");
const app = express();
const config = require("./config.json");

app.use(express.json());

const user = require("./routes/user.js");

app.use("/user", user);


app.listen(config.express.PORT, () => {
    console.log("The server is listening on port ", config.express.PORT);
});