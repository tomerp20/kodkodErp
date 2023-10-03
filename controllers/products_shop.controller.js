const { ErrProductNotFound, ErrConflict } = require("../lib/ResponseHandler");
//{ getAllInventory, getProductById, addProduct, updateProduct, deleteProduct}
const productsShopService = require("../services/products_shop.service");


//route.get('/', getAllInventory);
const getAllInventory = async (req, res, next) => {
    const products = await productsShopService.getAllInventory(req.query.search)
    res.ok(products);
}

const updateInventory = async (req, res, next) => {
    const products = req.body;
    const updateActionResult = await productsShopService.updateInventory(products)
    if(!updateActionResult.status){
        const returnValue = {productId: updateActionResult.productId, cause: updateActionResult.cause}
        if(updateActionResult.cause === "no product id"){
            return next(ErrProductNotFound(returnValue));
        }
        if(updateActionResult.cause === "not enough in stock"){
            return next(ErrConflict(returnValue));
        }
    }
    res.ok(`${products.length} products updated`);
}



module.exports = { getAllInventory, updateInventory }