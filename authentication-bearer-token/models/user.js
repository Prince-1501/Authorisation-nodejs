const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
  tokens: [{
    token:{
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({id: user._id}, "randomString")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User',UserSchema);

module.exports = User;
