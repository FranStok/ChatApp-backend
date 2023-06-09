const JWT=require("jsonwebtoken")
const validarJWT=(req,res=response,next)=>{
    const token=req.header("x-token");
    if(!token)
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la peticion."
        });
    try {
        //Si esto falla, el token no es valido y va al catch
        const {uid}=JWT.verify(token,process.env.JWT_KEY);
        req.uid=uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token no valido."
        });
    }
}

module.exports={
    validarJWT
}