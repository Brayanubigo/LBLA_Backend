import tipoSolicitud from "../models/TipoSolicitud.js";
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarid.js";




const registrar = async (req,res) =>{
   
    const {nombre} = req.body;
    
    //prevenir usuario duplicados
    const existeTipo = await tipoSolicitud.findOne({nombre})

    if(existeTipo){
       const error = new Error('Curso ya registrado');
       return res.status(400).json({msg: error.message});
    }
        
    try {
        //Guardar el usuario
        const tipo = new tipoSolicitud(req.body);
        const tipoGuardado = await tipo.save();
        
        
        res.json(tipoGuardado);
    } catch (error) {
        console.log(error);
    }

   
    
};

const perfil = async (req,res) =>{

    const existeTipo = await tipoSolicitud.find({})
    res.json( existeTipo)
};


const eliminar = async (req,res) =>{
  const {tipo_id} = req.params;
  
  const tipo = await tipoSolicitud.findByIdAndDelete(tipo_id);

    console.log(tipo)

  res.json(tipo);
};

export {
    registrar,
    perfil,
    eliminar

    
}