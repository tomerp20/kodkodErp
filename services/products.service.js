const { ObjectId } = require('mongodb'); // Import ObjectId

const { products } = require('../lib/mongo');


const getAllInventory = async () => {
    //get all records from products collection
    const productsList = await products().find({}).toArray();
    return productsList;
}
const getProductById = async (id) => {
    //get a single product by id
    const product = await products().findOne({  _id: ObjectId(id) });
    return product;
}
const getProductByName = async (name) => {
    const product = await products().findOne({ name: name });
    return product;
}
const addProduct = async (product) => {
    //add a single product
    const result = await products().insertOne(product);
    return result;
}
const updateProduct = async (id, product) => {
    console.log('UPDATING PRODUCT',{id, product})
    //update a single product by id with the given product
    return await products().updateOne({ _id: ObjectId(id) }, { $set: product }, { upsert: true });

}
const deleteProduct = async (id) => {
    //delete a single product by id
    return await products().deleteOne({ _id: ObjectId(id) });
}




module.exports = { getAllInventory, getProductById, addProduct, updateProduct, deleteProduct, getProductByName } 
