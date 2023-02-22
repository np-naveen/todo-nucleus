const jwt = require("jsonwebtoken")

async function authenticationToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.status(401).send({success:false,message:"Forbidden"})
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,data) => {
        if(err){
            return res.status(403).send({success:false,message:"Forbidden user"})
        }
        req.user = data
        next()
    })
}

module.exports = authenticationToken;