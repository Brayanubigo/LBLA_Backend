import mongoose from "mongoose";
import moment from 'moment';
moment.locale('es');

console.log(typeof(moment().format('l')))
const  solicitudSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    },
    tipo:{
        type: String,
        require:true,
        require: true
    },
    curso:{
        type: String,
        require: true,
        trim: true,
     
    },
    fecha:{
        type: String,
        trim: true
       
    },
    identificador:{
        type: String,
        trim: true
       
    },
    asignatura:{
        type: String,
        require:true,
        trim: true
       
    },
    cantidad:{
        type: Number,
        trim: true
       
    },
    
    descripcion:{
        type: String,
        trim: true
       
    },
   
    fechaHoraPedido:{
        type: String,
        trim: true
       
    },

    entregado:{
        type:Boolean,
        default:false
    }
});
const Solicitud = mongoose.model('Solicitud', solicitudSchema);
export default Solicitud