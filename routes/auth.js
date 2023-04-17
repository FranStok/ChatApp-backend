/*
    path:api/login
*/

const { Router } = require("express");

const { check } = require("express-validator");
const { crearUsuario, loginUsuario, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validad_campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.post("/new",[
    //Checkea que el nombre no sea vacio en la peticion
    check("nombre","el nombre es obligatorio").notEmpty(),
    check("mail","el mail es menor a 15 caracteres")
        .isLength({max:15}),
    check("mail","el mail ingresado no tiene un formato correcto")
        .isEmail(),
    check("password","la contraseña es obligatoria")
        .notEmpty(),
    check("password","la contraseña mayor de 3 caracteres")
        .isLength({min:3}),
    validarCampos
],crearUsuario)
router.post("/",[
    //Checkea que el nombre no sea vacio en la peticion
    check("mail","el mail ingresado no tiene un formato correcto")
        .isEmail(),
    check("password","la contraseña es obligatoria")
        .notEmpty(),
    validarCampos
],loginUsuario)
router.get("/renew",validarJWT,renewToken)

module.exports=router