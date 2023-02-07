import express from "express";
import mainRouter from "../routers/index.js";
import handlebars from "express-handlebars";
import __dirname from "../utils.js";
import viewsRouter from "../routers/views.router.js"
import {initWsServer} from "./socket.js"

import http from 'http'


const app = express();
const myHttpServer = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//iniciando handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'));

app.use("/api", mainRouter); //manejador de rutas
app.use('/',viewsRouter)// ruta websocket
initWsServer(myHttpServer)


//middleware de ruta error
app.use((req, res, next) => {
  return res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} not implemented`,
  });
});
export default myHttpServer
