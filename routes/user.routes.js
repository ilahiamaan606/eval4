const express=require("express");
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {client}=require("../redis")

const userrouter=express.Router()

userrouter.post("/signup",async(req,res)=>{
    let {email,password}=req.body;
    
    let userexist=await UserModel.findOne({email});

    if(userexist){
        res.send("Already registered")
    }
    else{
        bcrypt.hash(password,2,async(err,hash)=>{
            if(err){
                res.send(err)
            }
            else{
                await UserModel.insertMany([{email,password:hash}])
                res.send("Success")
            }
        })
    }
})

userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let userexist=await UserModel.findOne({email});

    // let blacklist=await client.sIsMember("blacklist","1");

    if(userexist){
        bcrypt.compare(password,userexist.password,(err,result)=>{
            if(result){
                let token=jwt.sign({ foo: 'bar' }, 'shhhhh');
                res.send({token})
            }
            else{
                res.send("Wrong")
            }
        })
    }
    else{
        res.send("doesnt exist")
    }
})

userrouter.get("/logout",async(req,res)=>{
    let token=req.headers.authentication?.split(" ")[1];

    await client.sAdd("blacklist",`${token}`)
    res.send("Logout success")
})



module.exports={
    userrouter
}