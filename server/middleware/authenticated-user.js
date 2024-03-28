const isAuthenticated= async function(req, res, next){
    let token = req.body?.refreshtoken || "";
    if(!token){
        return res.json({
            message: "Unauthenticated user",
            success: false
        })
    }
    next();
}

module.exports= isAuthenticated;