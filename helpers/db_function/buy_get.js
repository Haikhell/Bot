const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const searchProductById = require('../api_bestbuy/search_product');
const getPl = require('../api_bestbuy/get_obj_elem');

module.exports.buyGet = async function buyGet(userid, page) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  const lentM = 8;
  await client.connect();
  let temp;
  const collection = client.db('dbBot');
  const coll = collection.collection('userBuy');
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
    mas.push(await searchProductById.searchById(res.products[i].skuid));
  }
  temp = await getPl.getPlaginProduct(mas, page, userid, 2, 'favoritesBuy');
  client.close();
  return temp;
};
