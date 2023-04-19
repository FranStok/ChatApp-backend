const JWT=require("jsonwebtoken")

const generarJWT=(uid)=>{
    return new Promise((resolve,reject)=>{
        const payload={uid}
        JWT.sign(payload,process.env.JWT_KEY,{
            expiresIn:"24h"
        },(err,token)=>{
            if(err)
                reject("No se pudo generar el JWT")
            else
                resolve(token); //Devuelve el token.
        });
    });
}
//Verifica que el cliente que se vaya a conectar tenga un JWT
const comprobarJWT=(token)=>{
    try {
        //Si esto falla, el token no es valido y va al catch
        const {uid}=JWT.verify(token,process.env.JWT_KEY);
        return [true,uid]
    } catch (error) {
        return [false,null]
    }
}

module.exports={
    generarJWT,
    comprobarJWT
}