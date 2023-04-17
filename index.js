const express=require("express");
const path=require("path");
require("dotenv").config();

//db config
require("./database/config").dbConnection();

//App de express
const app=express();


//Lectura y parseo del body (Lo que viene en una peticion http delete, post ,put etc)
app.use(express.json());


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


require("./sockets/socket");


//Path publico.
const publicPath=path.resolve(__dirname, "public") //__dirname apunta donde esta el servidor.

app.use(express.static(publicPath));


//Rutas

app.use("/api/login",require("./routes/auth"))


server.listen(process.env.PORT, (err)=>{
    if(err)
        throw new Error(err);
    console.log("Servidor corriendo en puerto ",process.env.PORT);
})
