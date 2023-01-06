const mg = require('mongoose');
require('dotenv').config();
const ConnectToDatabase = async()=>{
    return new Promise((resolve,reject)=>{
        mg.connect(process.env.DB_URL,(err)=>{
            if(err){
                return reject();
            }
            return resolve();
        }) 
    })
}
module.exports = ConnectToDatabase; 