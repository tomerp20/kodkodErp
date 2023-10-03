const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://tomer:Z76Wm3LRjTEvcfb@erp.1tjlgcj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

let erp = {};
MongoClient.connect(uri, { useUnifiedTopology: true }).then((client, err) => {
    if (err) {
        console.log('Unable to connect to MongoDB');
        return;
    }
    console.log('Mongo DB is connected');
    erp = client.db('erp');
});

module.exports = { 
    users : () => {
        return erp.collection('users');
    },
    products : () => {
        return erp.collection('products');
    }
 };
