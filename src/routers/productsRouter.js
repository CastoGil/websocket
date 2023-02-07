import express from "express";
import productManager from "../controller/productManager.js";
const router = express.Router();

//Rutas de Productos//
//Mostramos los productos y si queremos mostramos un limite
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const products = await productManager.getProducts();
    if (!limit) {
      return res.status(200).json({ products });
    }
    if (limit > products.length) {
      return res.status(400).send("No existen tantos productos");
    } else {
      return res.send(products.slice(0, limit));
    }
  } catch {
    return res.status(404).send("La ruta no se encontro");
  }
});
//Mostramos por Id el producto
router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  try {
    if (!pid) {
      return res.status(404).send("Ingresa un id valido");
    }
    const productId = await productManager.getProductById(pid);
    return res.send(productId);
  } catch {
    return res.status(404).send("el id no existe");
  }
});
//Agregamos productos
router.post("/", async (req, res) => {
  const body = req.body;
  try {
    await productManager.addProduct(body);
    return res.status(201).json({ msg: "product saved successfully" });
  } catch {
    return res.status(400).json({
      error: "product not saved or the code exist",
    });
  }
});
//Actualizamos un producto pasandole los datos necesarios
router.put("/:pid", async (req, res) => {
  const body = req.body;
  const pid = parseInt(req.params.pid);
  try {
    if (isNaN(pid)) {
      return res.status(404).send("Ingresa un id valido por ruta");
    }

    await productManager.updateProduct(pid, body);
    return res.status(200).json({ msg: "product updated" });
  } catch {
    return res.status(400).json({
      error: "product not updated or not exist",
    });
  }
});
//Borramos el producto
router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  try {
    if (isNaN(pid)) {
      return res.status(404).send("Ingresa un id valido por ruta");
    }
    await productManager.deleteProduct(pid);
    return res.status(200).json({ msg: "product deleted" });
  } catch {
    return res.status(400).json({
      error: "product not deleted",
    });
  }
});

export default router;
