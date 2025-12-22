const express = require('express');
const cors = require('cors');   

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req,res)=>{
    console.log("Health Check OK");
    res.status(200).json({status:"OK"});
})

module.exports = app;