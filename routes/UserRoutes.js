import express from "express";
import { registrar, autenticar, perfil, olvidePassword, comprobarToken,nuevoPassword, confirmar,perfiles,eliminar } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/authMiddlewareUser.js";
const router = express.Router();


router.post('/',registrar);
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar);
router.post('/olvide-password',olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)
router.get('/eliminar/:user_id', eliminar);

//area privada
router.get('/perfil', checkAuth, perfil);
router.get('/perfiles',  perfiles);

export default router;