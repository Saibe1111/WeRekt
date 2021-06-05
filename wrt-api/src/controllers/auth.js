async function getAuth(req, res) {
    if(req.user){
        res.json({user: req.user});
    }else{
        res.status(401).json({msg: "Unauthorized"});
    }
}

async function discordRedirect(req, res) {
    res.redirect('http://localhost:8080/');
}

module.exports = {
    getAuth,
    discordRedirect
};

