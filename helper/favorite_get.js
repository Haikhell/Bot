const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
const getProducts = require('../api_bestbuy/get_obj_elem');
const searchProductById = require('../api_bestbuy/search_product');
const getPl = require('../api_bestbuy/get_obj_elem');
/// get Product
var temp;
module.exports.fGet = async function favoritesGet(userid) {
  await client.connect();

  const collection = client.db('dbBot');
  const coll = collection.collection('users');
  const res = await coll.findOne({ userId: userid });
  let mas = [];
  for (let i = 0; i < res.products.length; i++) {
    mas.push(await searchProductById.searchById(res.products[i]));
  }
  temp = await getPl.getPagin(mas, 1);
  client.close();
  return temp;
};
