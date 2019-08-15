const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
const searchProductById = require('../../api_bestbuy/search_product');
const getPl = require('../../api_bestbuy/get_obj_elem');
/// get Product
var temp;
module.exports.buyGet = async function buyGet(userid, page) {
  await client.connect();

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
