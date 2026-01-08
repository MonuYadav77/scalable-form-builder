const express = require('express');
const cors = require('cors');   

const errorHandler = require ('./middleware/error.middleware');
const authRoutes = require ('./modules/auth/auth.routes');
const formRoutes = require('./modules/form/form.routes');

const submissionRoutes = require('./modules/submissions/submission.route');
//logger
const requestLogger = require ('./middleware/requestLogger');

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req,res)=>{
    console.log("Health Check OK");
    res.status(200).json({status:"OK"});
})
app.use("/api/auth", authRoutes);

app.use('/api/forms', formRoutes);

app.use('/api/submissions', submissionRoutes);

// Global Error Handler
app.use(errorHandler);

//Logger
app.use(requestLogger);

module.exports = app;