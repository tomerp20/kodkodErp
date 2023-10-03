const { ErrProductNotFound, ErrConflict } = require("../lib/ResponseHandler");
//{ getAllInventory, getProductById, addProduct, updateProduct, deleteProduct}
const productsService = require("../services/products.service");


//route.get('/', getAllInventory);
const getAllInventory = async (req, res, next) => {
    const products = await productsService.getAllInventory()
    res.ok(products);
}
const getProductById = async (req, res, next) => {
    const product = await productsService.getProductById(req.params.id)
    if (!product) {
        return next(ErrProductNotFound());
    }
    res.ok(product);
}
const addProduct = async (req, res, next) => {
    const product = req.body;
    const maybeExisitingProduct = await productsService.getProductByName(product.name);
    if (maybeExisitingProduct) {
        return next(ErrConflict());
    }
    const newProduct = await productsService.addProduct(product)
    res.create(newProduct);
}
const updateProduct = async (req, res, next) => {
    const product = req.body;
    const maybeExisitingProduct = productsService.getProductById(req.params.id);
    if (!maybeExisitingProduct) {
        return next(ErrProductNotFound());
    }
    const updatedProduct = await productsService.updateProduct(req.params.id, product)
    res.ok("product updated");
}
const deleteProduct = async (req, res, next) => {
    const maybeExisitingProduct = await productsService.getProductById(req.params.id);
    if (!maybeExisitingProduct) {
        return next(ErrProductNotFound());
    }
    const deleted = productsService.deleteProduct(req.params.id)
    res.ok('product deleted');
}



module.exports = { getAllInventory, getProductById, addProduct, updateProduct, deleteProduct }


