const mg = require('mongoose');

const FavSchema = mg.Schema({
    userId:mg.Types.ObjectId,
    url:String,
    poster:String,
    title:String,
    singer:String,
    category:String
})
const FavModel = mg.model('favorite',FavSchema);
module.exports = FavModel;