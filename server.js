const express = require('express');
const cors = require('cors');
const dbConnection = require('./configuration/connect');
const app = express();

app.use(express.json());
app.use(cors());

dbConnection().then(()=>{
    app.listen(3000,()=>{
        console.log("database is connected and server is listening on http://localhost:3000");
    })
}).catch((err)=>{
    console.log(err);
})