import express  from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv"
import cors from 'cors';
import AdminRoutes from "./routes/AdminRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"
import CursoRoutes from "./routes/CursoRoutes.js"
import SolicitudRoutes from "./routes/SolicitudRoutes.js"
import AsignaturaRoutes from "./routes/AsignaturaRoutes.js"
import TipoSolicitudRoutes from "./routes/TipoSolicitudRoutes.js"
import { Server as SokectServer } from "socket.io";
import http from 'http'



const app = express()
const server = http.createServer(app)
const io= new SokectServer(server)

app.use(express.json());

dotenv.config();

conectarDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOption = {
    origin:function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOption))

app.use('/admin', AdminRoutes);
app.use('/user', UserRoutes);
app.use('/curso', CursoRoutes);
app.use('/soli', SolicitudRoutes);
app.use('/asig', AsignaturaRoutes);
app.use('/tipo', TipoSolicitudRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log('servidor arriba ')
});