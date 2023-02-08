import mongoose from "mongoose";
const  asignaturaSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    }
 
   
});
const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
export default Asignatura