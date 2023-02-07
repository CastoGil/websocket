import express from "express";
import cartManager from "../controller/cartManager.js";
import productManager from "../controller/productManager.js";
const router = express.Router();
//Ruta de Carrito
///Creando un nuevo Carrito
router.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    const carts = await cartManager.getAllProductsInCart();
    let idLastCartAdded = carts[carts.length - 1].id;
    return res.status(201).json({
      msg: `cart ${idLastCartAdded} successfully created`,
    });
  } catch {
    return res.status(400).json({
      msg: `error cart not created`,
    });
  }
});
//Mostramos los productos del carrito seleccionado
router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  try {
    if (isNaN(cid)) {
      return res.status(404).send("Ingresa un id valido por ruta");
    }
    const cart = await cartManager.getCartById(cid);
    return res.status(200).json({
      cart,
    });
  } catch {
    return res.status(400).json({
      error: "cart not exist",
    });
  }
});
///agregando productos al carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  let quantity = 1;
  try {
    if (isNaN(cid) || isNaN(pid)) {
      return res.status(404).send("Ingresa un id valido por ruta");
    }
    const cartCid = await cartManager.getCartById(cid);
    const productId = await productManager.getProductById(pid);

    const productAdd = {
      id: productId.id,
      quantity: quantity,
    };

    await cartManager.addNewProductCart(cartCid.id, productAdd);
    return res.status(200).json({
      msg: "product added to cart successfully",
    });
  } catch {
    return res.status(400).json({
      msg: "the product could not be added",
    });
  }
});
export default router;
