const express=require("express");
const {connection}=require("./db");
const { authenticate } = require("./middleware/authenticate");
const {userrouter}=require("./routes/user.routes")
const {weatherrouter}=require("./routes/weather.routes")
const {createlog}=require("./logger")
require("dotenv").config()

const app=express();
app.use(express.json())
app.use(createlog)

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user",userrouter);

app.use(authenticate)


app.use("/weather",weatherrouter)


app.listen(process.env.port,async ()=>{
    await connection;
    console.log(`Server running at ${process.env.port}`)
})