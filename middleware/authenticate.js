const jwt=require("jsonwebtoken")
const {client}=require("../redis")

async function authenticate(req,res,next){
    let token=req.headers.authorisation?.split(" ")[1];
    
    let blacklist=await client.sIsMember("blacklist",`${token}`);

    if(blacklist){
        res.send("You are blacklisted")
    }
    else{
        if(token){
            jwt.verify(token, 'shhhhh', function(err, decoded) {
                if(decoded){
                    next()
                }
                else{
                    res.send(err.message)
                }
              });
        }
        else{
            res.send("token unavailable")
        }
    }
}

module.exports={
    authenticate
}