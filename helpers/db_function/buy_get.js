const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const searchProductById = require('../api_bestbuy/search_product');
const getPl = require('../api_bestbuy/get_obj_elem');

module.exports.buyGet = async function buyGet(userid, page) {
  const client = new MongoClient(uri, { useNewUrlParser: true });

  await client.connect();
  let temp;
  const collection = client.db('dbBot');
  const coll = collection.collection('userBuy');
  const res = await coll.findOne({ userId: userid });
  let mas = [];
  for (let i = 0; i < res.products.length; i++) {
    mas.push(await searchProductById.searchById(res.products[i].skuid));
  }
  temp = await getPl.getPlaginProduct(mas, page, userid, 2);
  client.close();
  return temp;
};