const express = require('express');
const cors = require('cors');   

const errorHandler = require ('./middleware/error.middleware');
const authRoutes = require ('./modules/auth/auth.routes');
const formRoutes = require('./modules/form/form.routes');

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req,res)=>{
    console.log("Health Check OK");
    res.status(200).json({status:"OK"});
})
app.use("/api/auth", authRoutes);

app.use('/api/forms', formRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;