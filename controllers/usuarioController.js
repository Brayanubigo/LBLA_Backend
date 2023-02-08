import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarid.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req,res) =>{
   
    const {email, nombre} = req.body;
    
    //prevenir usuario duplicados
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario){
       const error = new Error('Usuario ya registrado');
       return res.status(400).json({msg: error.message});
    }
        
    try {
        //Guardar el usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        
        //enviar email
        emailRegistro({
            email,
            nombre,
            token:usuarioGuardado.token
        })

        
        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }

   
    
};

const perfil = (req,res) =>{
    const {usuario} = req;
    res.json( usuario)
};


const perfiles = async (req,res) =>{

    const existeUsuario = await Usuario.find({})
    res.json( existeUsuario)
};



const confirmar =  async (req,res) => {
   const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json ({msg: error.message});
    }

    try {
       usuarioConfirmar.token = null,
       usuarioConfirmar.confirmado = true
       await usuarioConfirmar.save();

       res.json({msg:"Usuario confirmado correctamente"});

    } catch (error) {
        console.log(error)
    }

   
}

const autenticar = async (req,res) =>{
    const {email, password} = req.body
    
    const usuario = await Usuario.findOne({email})

    if(!usuario){
        const error = new Error('Usuario no existe');
        return res.status(404).json ({msg: error.message});
    }
   
    // si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(404).json ({msg: error.message});
    }
    
    // revisar el password
    if(await usuario.comprobarPassword(password)){
       
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token: generarJWT(usuario.id),
        });

    } else{
        const error = new Error('La contraseña es incorrecto');
        return res.status(404).json ({msg: error.message});
    }
};


const olvidePassword = async (req,res) =>{
   const {email} = req.body;

   const existeUsuario = await Usuario.findOne({email})
   if(!existeUsuario){
    const error = new Error('El usuario no existe');
        return res.status(400).json ({msg: error.message});
   }

   try {
        existeUsuario.token= generarId();
        await existeUsuario.save()
        
        emailOlvidePassword({
            email,
            nombre: existeUsuario.nombre,
            token:existeUsuario.token
        });

        res.json({msg: 'Hemos enviado un email con las instrucciones'})




   } catch (error) {
    console.log(error)
   }

};

const comprobarToken = async (req,res) =>{
   const {token} = req.params;
    const tokenValido = await Usuario.findOne({token});
    if(tokenValido){
        res.json({msg: "Token valido y el usuario existe"});
    }else{
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message});
    }
   
};

const nuevoPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;
    const usuario = await Usuario.findOne({token});
    if(!usuario){
       const error = new Error ('Hubo un error');
       return res.status(400).json({msg: error.message})
    }
   
    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({msg: "Password modficado correctamente"})
    } catch (error) {
        console.log(error)
    }

    
};

const eliminar = async (req,res) =>{
    const {user_id} = req.params;
    
    const usuario = await Usuario.findByIdAndDelete(user_id);
  
      console.log(usuario)
  
    res.json(usuario);
  };
export {
    registrar,
    autenticar,
    perfil,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfiles,
    eliminar
    
}