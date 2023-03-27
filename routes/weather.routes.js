const express = require("express");
const { client } = require("../redis")
const {SearchModel}=require("../models/search.model")
const {validation}=require("../middleware/validation")
// const fetch = require('node-fetch');



const weatherrouter = express.Router()

weatherrouter.use(express.json())

weatherrouter.use(validation)

weatherrouter.get("/:city", async (req, res) => {
    let { city } = req.params;

    await SearchModel.insertMany([{city}])

    let data = await client.get(`${city}`)

    if (data) {
        res.send(JSON.parse(data))
    }
    else {
        fetch(`http://api.weatherapi.com/v1/current.json?q=${city}`)
            .then(res => res.json())
            .then((data) => {
                res.send(data);
                data=JSON.stringify(data);
                
                client.set(`${city}`, `${data}`, {
                    EX: 1800
                })
            });
    }



})


module.exports = {
    weatherrouter
}