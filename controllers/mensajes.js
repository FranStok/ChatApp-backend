
const Mensaje=require("../models/mensaje")

const getChat=async(req,res=response)=>{
    const miId=req.uid;
    const mensajesEmisor=req.params.emisor; //Viene de "/:emisor" en mensajes.js de routes. Parametros

    const last30=await Mensaje.find({
        //Condicion para la busqueda.
        $or:[{emisor:miId,receptor:mensajesEmisor},{emisor:mensajesEmisor,receptor:miId}]
    })
    .sort({createdAt:"desc"}) //sort de manera descendente
    .limit(30); //limita a los ultimos 30 mensajes

    res.json({
        ok:true,
        mensajes:last30
    })

}

module.exports={
    getChat
}