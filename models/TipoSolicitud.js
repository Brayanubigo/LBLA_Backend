import mongoose from "mongoose";
const  tipoSolicitudSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    }
 
   
});
const tipoSolicitud = mongoose.model('Tipo', tipoSolicitudSchema);
export default tipoSolicitud