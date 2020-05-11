// Constants
const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const databaseURL = "mongodb://localhost/classhare"
mongoose.Promise = global.Promise
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

const db = mongoose.connect(databaseURL, options)

const postsRoutes  = require('./routes/productRoute')
const userRoutes = require('./routes/userRoute')

app.options('*', cors())
app.use(cors());

// USERS
app.use('/user', userRoutes)
//POSTS
app.use('/posts', postsRoutes)
// General



app.get('/', (req, res)=>{
    res.send("Hello")
})




module.exports = app;