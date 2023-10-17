const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    // fullname: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongooose.model('Users', userSchema);

module.exports = User;