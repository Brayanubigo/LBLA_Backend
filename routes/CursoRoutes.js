import express from "express";
import { registrar, perfil, eliminar } from "../controllers/cursoController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',registrar);



//area privada
router.get('/perfil', perfil);
router.get('/eliminar/:curso_id', eliminar);


export default router;