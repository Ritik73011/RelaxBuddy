const mg = require('mongoose');

const trendSchema = mg.Schema({
    url:String,
    poster:String,
    singer:String,
    category:String,
    premium:Boolean
})
const TrendSongs = mg.model('trendings',trendSchema);
module.exports = TrendSongs;