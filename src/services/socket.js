import { Server } from "socket.io";
import productManager from "../controller/productManager.js";

let io;
//iniciamos el servidor de websocket
const initWsServer = (server) => {
  io = new Server(server);
  //iniciamos la conexion con el cliente
  io.on("connection", (socket) => {
    console.log("Nueva Conexion establecida!", socket.id);
    //leemos todos los productos
    socket.on("allProducts", async () => {
      const products = await productManager.getProducts();
      products.forEach((unProducto) => {
        socket.emit("producto", unProducto);
      });
    });
   
  })
  return io;
};

const socketEmitBack= async()=>{
  const products= await productManager.getProducts()
    io.emit("productos",products)
}

const socketEmit = (eventName, message) => {
    io.emit(eventName, message);
};


export { initWsServer, socketEmit, socketEmitBack};