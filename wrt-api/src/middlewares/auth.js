function isAuthorized (req, res, next) {

    if(req.user){
        next()
    }else{
        res.status(401).json({msg: "Unauthorized"});
    }

};

module.exports = {
    isAuthorized
};