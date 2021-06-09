const config = require("../config.json");

async function getAuth(req, res) {
    res.json({user: req.user});
    
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

