const mg = require('mongoose');

const SongsChema = mg.Schema({
    url:String,
    poster:String,
    singer:String,
    category:String,
    premium:Boolean
})
const SongsModel = mg.model('songs',SongsChema);
module.exports = SongsModel;