import express from "express";
import { registrar, perfil, eliminar,actualizar } from "../controllers/asignaturaController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',registrar);



//area privada
router.get('/perfil', perfil);
router.get('/eliminar/:asigna_id', eliminar);
router.put("/actualizar/:_id",actualizar);

export default router;