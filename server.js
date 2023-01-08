const express = require('express');
const cors = require('cors');
const dbConnection = require('./configuration/connect');
const signupRoute = require('./controllers/register.controller');
const loginRoute = require('./controllers/login.controller');
const categoryRoute = require('./controllers/category.controllers');
const songsRoute = require('./controllers/songs.controllers');
const premiumRoute = require('./controllers/premium.controllers');
const trendsRoute = require('./controllers/trend.controllers');
const favRoute = require('./controllers/favorite.controllers');
const searchRoute = require('./controllers/search.controller');
const forgetPassRoute = require('./controllers/forget-pass.controller');
const app = express();

app.use(express.json());
app.use(cors());
app.use(signupRoute);
app.use(loginRoute);
app.use(categoryRoute);
app.use(songsRoute);
app.use(premiumRoute);
app.use(trendsRoute);
app.use(favRoute);
app.use(searchRoute);
app.use(forgetPassRoute);

dbConnection().then(()=>{
    app.listen(3000,()=>{
        console.log("database is connected and server is listening on http://localhost:3000");
    })
}).catch((err)=>{
    console.log(err);
})