/*
GET /api/shop_inventory?search={searchText} - מאחזר את כל פריטי המלאי למכירה, פרמטר חיפוש אופציונלי:
response body: shopProductInterface[ ]

GET /api/shop_inventory/{productId} - מאחזר פריט מלאי ספציפי:
response body: shopProductInterface

POST /api/shop_inventory/updateInventory - מעדכן את המוצרים שנרכשו:
req body: {
productId: string
requiredQuantity: number
}[ ]
On error - res body: {
	productId: string
	cause: “no product id” | “not enough in stock”
}


*/

const express = require('express');
const route = express.Router();
const { productSchema } = require('../dto/product.schema');
const { validateDto } = require('../dto/validate');

const { getAllInventory, updateInventory } = require('../controllers/products_shop.controller');
const { getProductById } = require('../controllers/products.controller');

route.get('/', getAllInventory);
route.get('/:id', getProductById);
route.put('/', updateInventory);

module.exports = route;