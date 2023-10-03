/*
GET /api/inventory - מחזיר את כל פריטי המלאי:
response body: adminProductInterface[ ]

GET /api/inventory/{productId} - מחזיר פריט מלאי ספציפי:
response body: adminProductInterface

POST /api/inventory - מוסיף פריט מלאי חדש:
request body: Omit<adminProductInterface, “id”>
response body: adminProductInterface

PUT /api/inventory/{productId} - מעדכן פריט מלאי:
request body: Partial<adminProductInterface>
response body: adminProductInterface

DELETE /api/inventory/{productId} - מוחק פריט מלאי:
response body: adminProductInterface

*/

const express = require('express');
const route = express.Router();
const { productSchema } = require('../dto/product.schema');
const { validateDto } = require('../dto/validate');

const { getAllInventory, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

route.get('/', getAllInventory);
route.get('/:id', getProductById);
route.post('/', validateDto(productSchema), addProduct);
route.put('/:id', validateDto(productSchema), updateProduct);
route.delete('/:id', deleteProduct);





module.exports = route;