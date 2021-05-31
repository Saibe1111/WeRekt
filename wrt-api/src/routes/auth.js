const router = require("express").Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) =>{
    res.redirect('https://werekt.cuvellier.fr/');
});

router.get('/', (req, res) =>{
    if(req.user){
        res.json({user: req.user});
    }else{
        res.status(401).json({msg: "Unauthorized"});
    }

});

module.exports = router;