const jwt = require("jsonwebtoken")

async function verifyUser(req,res){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.status(401).send({success:false,message:"Forbidden"})
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,data) => {
        if(err){
            return res.status(403).send({success:false,message:"Forbidden user"})
        }
        res.status(200).send({success:true,data:data})
    })
}

module.exports = verifyUser;