/*
    path:api/mensajes
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-JWT");
const { getChat } = require("../controllers/mensajes");

const router = Router();

router.get("/:emisor",validarJWT,getChat)
module.exports=router