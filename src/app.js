import myHttpServer from "./services/server.js";

//Servidor Escuchando//
const PORT = process.env.PORT || 8080;
myHttpServer.listen(PORT, () => console.log("server listening on port", PORT));

