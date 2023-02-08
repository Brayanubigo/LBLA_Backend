import Solicitud from "../models/Solicitud.js";
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarid.js";
import emailNotificacion from "../helpers/emailNotificacion.js";




const registrar = async (req,res) =>{
   
    const {email,nombre,tipo,curso,cantidad,asignatura,descripcion} = req.body
    try {
        //Guardar el usuario
        
        const solicitud = new Solicitud(req.body);
        const solicitudGuardada = await solicitud.save();
        
        // emailNotificacion({
        //     email,
        //     nombre,
        //     tipo,
        //     curso,
        //     cantidad,
        //     asignatura,
        //     descripcion
        // })
        
        res.json(solicitudGuardada);
    } catch (error) {
        console.log(error);
    }

   
    
};

const perfil = async (req,res) =>{

    const existeSolicitud = await Solicitud.find({})
    res.json( existeSolicitud)
};

const perfilusuario = async (req,res) =>{
    const {identificador} = req.params
    const existeSolicitud = await Solicitud.find({identificador})
    res.json( existeSolicitud)
};

const eliminar = async (req,res) =>{
    const {soli_id} = req.params;
    
    const solicitud = await Solicitud.findByIdAndDelete(soli_id);
  
      console.log(solicitud)
  
    res.json(solicitud);
  };

  const estadosi = async (req, res) =>{
   
    const {soli_id } = req.params
    const solicitud = await Solicitud.findByIdAndUpdate(soli_id);
    if(!solicitud){
        const error = new Error ('Hubo un error');
        return res.status(400).json({msg: error.message})
     }
    try {
       
        solicitud.entregado = true
        await solicitud.save()
        console.log(solicitud)
       
        res.json({msg: "Estado cambiado exitosamente"})
    } catch (error) {
        console.log(error)
    }
  }

  const estadono = async (req, res) =>{
   
    const {soli_id } = req.params
    const solicitud = await Solicitud.findByIdAndUpdate(soli_id);
    if(!solicitud){
        const error = new Error ('Hubo un error');
        return res.status(400).json({msg: error.message})
     }
    try {
       
        solicitud.entregado = false
        await solicitud.save()
        console.log(solicitud)
       
        res.json({msg: "Estado cambiado exitosamente"})
    } catch (error) {
        console.log(error)
    }
  }



export {
    registrar,
    perfil,
    eliminar,
    estadosi,
    estadono,
    perfilusuario

    
}