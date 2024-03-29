import Asignatura from "../models/Asignatura.js";




const registrar = async (req,res) =>{
   
    const {nombre} = req.body;
    
    //prevenir usuario duplicados
    const existeAsignaruta = await Asignatura.findOne({nombre})

    if(existeAsignaruta){
       const error = new Error('Asignatura ya registrado');
       return res.status(400).json({msg: error.message});
    }
        
    try {
        //Guardar el usuario
        const asignatura = new Asignatura(req.body);
        const asignaturaGuardado = await asignatura.save();
        
        
        res.json(asignaturaGuardado);
    } catch (error) {
        console.log(error);
    }

   
    
};

const actualizar = async (req,res) =>{
    const {_id} = req.params;
   
   
    const existeAsig = await Asignatura.findByIdAndUpdate(_id, req.body)
    res.json( existeAsig)
   
};



const perfil = async (req,res) =>{

    const existeAsignaruta = await Asignatura.find({})
    res.json( existeAsignaruta)
};


const eliminar = async (req,res) =>{
  const {asigna_id} = req.params;
  
  const asignatura = await Asignatura.findByIdAndDelete(asigna_id);

   

  res.json(asignatura);
};

export {
    registrar,
    perfil,
    eliminar,
    actualizar

    
}