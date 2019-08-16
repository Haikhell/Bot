const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const searchProductById = require('../api_bestbuy/search_product');
const getPl = require('../api_bestbuy/get_obj_elem');

/// get Product
module.exports.fGet = async function favoritesGet(userid, page) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  let temp;
  const collection = client.db('dbBot');
  const coll = collection.collection('users');
  const res = await coll.findOne({ userId: userid });
  let mas = [];
  for (let i = 0; i < res.products.length; i++) {
    mas.push(await searchProductById.searchById(res.products[i]));
  }
  temp = await getPl.getPlaginProduct(mas, page, userid, 1);
  await client.close();
  return temp;
};
