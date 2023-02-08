import Curso from "../models/Curso.js";
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarid.js";




const registrar = async (req,res) =>{
   
    const {nombre} = req.body;
    
    //prevenir usuario duplicados
    const existeCurso = await Curso.findOne({nombre})

    if(existeCurso){
       const error = new Error('Curso ya registrado');
       return res.status(400).json({msg: error.message});
    }
        
    try {
        //Guardar el usuario
        const curso = new Curso(req.body);
        const cursoGuardado = await curso.save();
        
        
        res.json(cursoGuardado);
    } catch (error) {
        console.log(error);
    }

   
    
};

const perfil = async (req,res) =>{

    const existeCurso = await Curso.find({})
    res.json( existeCurso)
};


const eliminar = async (req,res) =>{
  const {curso_id} = req.params;
  
  const curso = await Curso.findByIdAndDelete(curso_id);

    console.log(curso)

  res.json(curso);
};

export {
    registrar,
    perfil,
    eliminar

    
}