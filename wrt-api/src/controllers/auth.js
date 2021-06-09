const config = require("../config.json");

async function getAuth(req, res) {
    if(req.user){
        res.json({user: req.user});
    }else{
        res.status(401).json({msg: "Unauthorized"});
    }
}

async function discordRedirect(req, res) {
    res.redirect(config.front.URL);
}

async function logout(req, res) {
    req.logout();
    res.redirect(config.front.URL);
}

module.exports = {
    getAuth,
    discordRedirect,
    logout
};

