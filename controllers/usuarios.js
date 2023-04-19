const {response}=require("express");
const Usuario = require("../models/usuario");

const getUsuarios=async(req,res=response)=>{
    //desde es 0 por defecto, pero si la query es /api/usuarios?desde=5, seria 5. Desde el 5 en adelante
    const desde=Number(req.query.desde) || 0

    //sort ordena por el valor online. - se refiere a descendente
    const usuariosDB=await Usuario
        .find({_id:{$ne:req.uid}}) //busca todos los id menos el que mando la request. $ne es not existent.
        .sort("-online")
        .skip(desde)
        .limit(20); //Limita a 20 usuarios por get.
    return res.json({
        ok:true,
        usuarios:usuariosDB,
        msg:"getUsuarios"
    })
}

module.exports={
    getUsuarios
}