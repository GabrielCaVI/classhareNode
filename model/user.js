const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const user = new Schema({
  email: {type: String, required: true, unique:true},
  username: {type: String, 
    required: true,
    unique: true,
    match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  password : {type: String, required: true}

})

module.exports = 
  mongoose.model('User', user)


