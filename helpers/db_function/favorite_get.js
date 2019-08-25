const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const searchProductById = require('../api_bestbuy/search_product');
const getPl = require('../api_bestbuy/get_obj_elem');

/// get Product
module.exports.fGet = async function favoritesGet(userid, page) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  let temp;
  const lentM = 8;
  const collection = client.db('dbBot');
  const coll = collection.collection('users');
  const res = await coll.findOne({ userId: userid });
  let mas = [];
  let end;
  let start;

  if (res.products.length < page * lentM) {
    start = (+page - 1) * lentM;
    end = res.products.length;
  } else {
    start = (+page - 1) * lentM;
    end = +page * lentM;
  }
  for (let i = start; i < end; i++) {
    mas.push(await searchProductById.searchById(res.products[i]));
  }
  temp = await getPl.getPlaginProduct(mas, page, userid, 1, 'favorites');
  await client.close();
  return temp;
};
