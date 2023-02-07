import Router from "express"
import productsRouter from "./productsRouter.js"
import cartRouter from "./cartRouter.js"

const router= Router()

///DEFINIMOS RUTAS//
router.use("/products", productsRouter)
router.use("/carts", cartRouter)


export default router