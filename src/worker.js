require('dotenv').config();

const connectDB = require('./config/db');

const startConsumer = require('./modules/submissions/submission.consumer');

(async ()=>{
    await connectDB();
    await startConsumer();

})();