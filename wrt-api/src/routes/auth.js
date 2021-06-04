const router = require("express").Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) =>{
    res.redirect('http://localhost:8080/');
});

router.get('/', (req, res) =>{
    if(req.user){
        res.json({user: req.user});
    }else{
        res.status(401).json({msg: "Unauthorized"});
    }

});

module.exports = router;