//CONSTANTS
const http = require('http');
const app = require('./app')
const PORT = 8080


const server = http.createServer(app);



// SERVER
server.listen(PORT,function (){
    console.log('app running on port', PORT)
})


