const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const post = new Schema ({
  username: {type: String, ref: 'User'},
  subject : {type: String, required: true},
  title: {type: String, required: true},
  text: {type: String, required: true},
  useful: {type: Number,required: true, defuault: 0},
  notUseful: {type: Number,required: true, defuault: 0}
})

module.exports = mongoose.model('Post', post)