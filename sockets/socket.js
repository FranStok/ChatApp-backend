
const {io} =require("../index");



//Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado")

    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
    });
    //on es para escuchar, emit es para mandar.
    //En index.html estoy mandando con emit un mensaje "mensaje", que aca lo escucho
    // client.on("mensaje",(payload)=>{
    //      console.log(payload);
    //      io.emit("mensaje", {admin: "Nuevo mensaje"})
    // });
    //Desde el navegador, en al consola pongo socket.emit("emitir-mensaje","Fran"), es decir,
    //desde el cliente navegador, emito el mensaje, que lo escuchan todos los clientes
    //con este metodo, y luego emito el mensaje "nuevo-mensaje" a todos los clientes.
    //Luego, en SocketProvider, en la app flutter, escucho este "nuevo-mensaje" e imprime
    //el payload.
    client.on("emitir-mensaje",(payload)=>{
        //console.log(payload);
        //io.emit("nuevo-mensaje", payload); //Emite a TODOS los clientes, inclusive el que mando el mensaje
        client.broadcast.emit("emitir-mensaje", payload); //Se lo emite a todos menos a si mismo.
    })
});