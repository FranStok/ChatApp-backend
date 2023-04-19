
const { comprobarJWT } = require("../helpers/jwt");
const {io} =require("../index");
const {usuarioConectado,usuarioDesconectado,guardarMensaje}=require("../controllers/socket");



//Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado")

    //Compruebo que el cliente tenga un id, es decir , verefico que el que se conecta sea un usuario
    //de la aplicacion, y no un cliente externo. //Si no viene el x-token en los headers
    //significa que no es un usuario.
    const [valido,uid]=comprobarJWT(client.handshake.headers["x-token"]);
    if(!valido)
        return client.disconnect();
    console.log("cliente autenticado");

    //Cambia el estado del usuario en la base de datos de offline a online
    usuarioConectado(uid)

    //Ingresar al usuario a una sala especifica para comunicacion por chat
    //Sala global (Donde estan todos los dispositivos conectados) aqui se le pueden mandar
        //mensajes globales a todos los clientes
    //Client.id manda un mensaje a un cliente en especifico, porque el server le asigna
        //un id especifico a cada cliente que se conecta.
    //Para unir a una persona a una sala, se utiliza una sala con el uid de la base de datos.
        //De esta manera, cada usuario va a tener su sala personal, que corresponde con su uid
        //No confundir uid (BD) con id del socket cliente que es el que se usa en client.id.
    client.join(uid); //Aqui ingresa al cliente (usuario) a su sala especifica con su uid.

    // client.to(uid).emit(...) Asi mando un mensaje a esa sala particular.

    //Escuchar del cliente (emisor) el mensaje personal

    client.on("mensaje-personal",async(payload)=>{
        await guardarMensaje(payload);
        io.to(payload.receptor).emit("mensaje-personal",payload);
    })

    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
        usuarioDesconectado(uid);
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