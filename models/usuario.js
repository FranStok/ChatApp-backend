const{Schema,model}=require("mongoose")

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:true
    },   
    mail:{
        type:String,
        required:true,
        unique:true
    },    
    password:{
        type:String,
        required:true,
    },    
    online:{
        type:Boolean,
        default:false,
    }    
})

//Este metodo hace que el postman devuelva solo los datos que quiero, cuando creo un usuario.
UsuarioSchema.method("toJSON",function(){
    //__v es eliminado junto con password. _id es renombrado.
    //Saco de this.toObject, las propiedades que deseo eliminar/modificar
    //y luego con ..., le estoy diciendo que TODAS las otras propiedades que no
    //nombre, van a parar a demasPropiedades.
    //Luego para modificar el id, le agrego una propiedad uid, que es igual a _id.
    if({_id}=this.toObject!=""){
        const {__v,_id,password,...demasPropiedades} = this.toObject(); //this.toObject es la instancia del objeto que esta creado en este momento
        demasPropiedades.uid=_id;
        return demasPropiedades
    }
})

module.exports=model("Usuario",UsuarioSchema);