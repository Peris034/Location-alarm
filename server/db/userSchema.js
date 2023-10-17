const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection`+ err));

const userSchema = new mongoose.Schema({
  //fullname: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});


const User = mongoose.model('Users', userSchema);

module.exports = User;
