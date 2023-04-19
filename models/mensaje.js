const{Schema,model}=require("mongoose")

const MensajeSchema=Schema({
    receptor:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },   
    emisor:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },     
    mensaje:{
        type:String,
        required:true,

    }    
},{
    //Config adicional al esquema
    timestamps:true
})

MensajeSchema.method("toJSON",function(){
        const {__v,_id,...demasPropiedades} = this.toObject();
        return demasPropiedades
})

module.exports=model("Mensaje",MensajeSchema);