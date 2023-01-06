const mg = require('mongoose');

const UserSchema = mg.Schema({
    name: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 16,
        required: true
    },
    premium:Boolean
})
const UserModel = mg.model('relax_buddy_users',UserSchema);
module.exports = UserModel;