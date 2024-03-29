import express from "express";
import { registrar, perfil, eliminar,actualizar } from "../controllers/tipoSolicitudController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',registrar);



//area privada
router.get('/perfil', perfil);
router.put("/actualizar/:_id",actualizar)
router.get('/eliminar/:tipo_id', eliminar);


export default router;