const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  },
  tokens: [ {
    token:{type: String, required: true}
  } ]
});

const User = mongoose.model('User',UserSchema);

module.exports = User;
