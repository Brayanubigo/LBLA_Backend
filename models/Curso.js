import mongoose from "mongoose";
const  cursoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    }
 
   
});
const Curso = mongoose.model('Curso', cursoSchema);
export default Curso