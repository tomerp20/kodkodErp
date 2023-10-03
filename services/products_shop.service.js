const { ObjectId } = require('mongodb'); // Import ObjectId
const { products } = require('../lib/mongo');
const productsService = require("./products.service");

const getAllInventory = async (searchQuery) => {
    //get all records from products collection
    let productsList = await productsService.getAllInventory();
    if (searchQuery) {
        //filter the productsList by searchQuery
        productsList = productsList.filter(product => product.name.includes(searchQuery));
        //order by name
        productsList = productsList.sort((a, b) => a.name.localeCompare(b.name));
    }
    return productsList;
}
const updateInventory = async (products) => {
    //get all inventory items. check that all products exist and that there is enough in stock.
    //if not, return false
    //if ok => update the inventory (DB) and return true
    const productsList = await getAllInventory();
    let status = false
    for (product of products) {
        //check that product exists
        const productInList = productsList.find(p => p._id.toString() === product.productId);
        if (!productInList) {
            return { status, productId: product.productId, cause: "no product id" };
        }
        //check that there is enough in stock
        if (productInList.quantity < product.requiredQuantity) {
            return { status, productId: product.productId, cause: "not enough in stock" };
        }
    }
    //update inventory
    for (product of products) {

        const currentProduct = productsList.find(p => p._id.toString() === product.productId);
        await productsService.updateProduct(product.productId, { ...product, quantity: parseInt(currentProduct.quantity) - parseInt(product.requiredQuantity) });
    }
    return {
        status: true,
    }
}




module.exports = { getAllInventory, updateInventory }
