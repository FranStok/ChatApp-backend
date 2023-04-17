const { validationResult } = require("express-validator");


const validarCampos=(request,res,next)=>{
    //Hace la validacion y utiliza el check de auth.js de routes para ver que campos tiene que validar.
    const errores=validationResult(request);
    if(!errores.isEmpty()){  
        return res.status(400).json({
            ok:false,
            errors:errores
        })
    }
    next();
}

module.exports={
    validarCampos
}