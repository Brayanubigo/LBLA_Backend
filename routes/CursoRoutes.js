import express from "express";
import { registrar, perfil, eliminar,actualizar } from "../controllers/cursoController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',registrar);



//area privada
router.get('/perfil', perfil);
router.get('/eliminar/:curso_id', eliminar);
router.put("/actualizar/:_id",actualizar)

export default router;