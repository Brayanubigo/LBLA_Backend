import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from "../helpers/generarid.js";
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,
        trim:true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
   token:{
        type: String,
        default:generarId(),
   },
   confirmado:{
    type: Boolean,
    default:false
   }
});
//hashear password
usuarioSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
} )
//comprobar password
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario,this.password)
};
const Admin = mongoose.model('Usuario', usuarioSchema);

export default Admin;