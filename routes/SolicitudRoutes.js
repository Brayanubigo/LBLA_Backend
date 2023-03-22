import express from "express";
import { enviar, perfil, eliminar,estadosi,estadono, perfilusuario } from "../controllers/solicitudController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',enviar);

router.get('/estadosi/:soli_id',estadosi)
router.get('/estadono/:soli_id',estadono)

//area privada
router.get('/perfil', perfil);
router.get('/perfiluser/:identificador', perfilusuario)
router.get('/eliminar/:soli_id', eliminar);

export default router;