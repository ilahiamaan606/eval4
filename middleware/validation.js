function validation(req,res,next){
    let { city } = req.params;
    
    let regex=/[^A-z]/;
    
    if(regex.test(city)){
        res.send("Invalid city")
    }
    else{
        next()
    }
}

module.exports={
    validation
}