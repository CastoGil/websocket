import express from "express";
const router = express.Router();
import productManager from "../controller/productManager.js";
import { socketEmit, socketEmitBack } from "../services/socket.js";
//Ruta principal
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch {
    return res.status(404).send("La ruta no se encontro");
  }
});
//Ruta websocket
router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch {
    return res.status(404).send("La ruta no se encontro");
  }
});
router.post("/realtimeproducts", async (req, res) => {
  try {
    const objeto = req.body;
    const result = await productManager.addProduct(objeto);
    socketEmit("producto", result);
    res.json({ msg: result });
  } catch {
    return res.status(404).send("La ruta no se encontro");
  }
});
router.delete("/realtimeproducts/:pid", async (req, res) => {
  const pid =parseInt(req.params.pid)
  
  try{
    if (isNaN(pid)) {
      return res.status(404).send("Ingresa un id valido por ruta");
    }
    await productManager.deleteProduct(pid)

    await socketEmitBack()
    return res.status(200).json({ msg: "product deleted" })
  }catch{
    return res.status(400).json({
      error: "product not deleted",
    });

  }
  
});

export default router;
