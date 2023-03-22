import mongoose from "mongoose";
const  tipoSolicitudSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    },
    stock:{
        type:Number,
        require:true

    }
 
   
});
const tipoSolicitud = mongoose.model('Tipo', tipoSolicitudSchema);
export default tipoSolicitud