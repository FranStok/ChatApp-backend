const { mongo, default: mongoose } = require("mongoose");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const bcrypt=require("bcryptjs")
const {response}=import("express");

const crearUsuario=async(request,res=response)=>{
    const {mail,password}=request.body;

    try {
        //Usuario.findOne busca en la base de datos si el mail existe.
        const existeEmail=await Usuario.findOne({mail});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:"El mail ya existe."
            })
        }
        const usuario=new Usuario(request.body);

        //Encriptacion de contraseña

        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt)

        //Guardo usuario en la base de datos (Atlas)
        await usuario.save();

        //Genero JWT (Jason Web Token)
        const token=await generarJWT(usuario.id);


    
        res.json({
            ok:true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}
const loginUsuario=async(request,res=response)=>{
    const {mail,password}=request.body;
    try {
        //Usuario.findOne busca en la base de datos si el mail existe.
        const usuarioDB=await Usuario.findOne({mail});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:"El mail no existe."
            })
        };

        //Comparar contraseñas.
        const validPassword=bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"La contraseña no es valida."
            })
        }

        //Generar JWT
        const token=await generarJWT(usuarioDB.id);


        return res.json({
            ok:true,
            msg:"login",
            usuario:usuarioDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

const renewToken=async(req,res=response)=>{
    const uid=req.uid; //el uid lo saco del middleware validar-JWT (Mirar auth.js de routes)
    const usuarioDB=await Usuario.findById(uid); 
    const token=await generarJWT(uid);
    return res.json({
        ok:true,
        usuario:usuarioDB,
        token
    })
    
}

module.exports={
    crearUsuario,
    loginUsuario,
    renewToken
}