const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

module.exports.delFavoriteElem = async function delFavoriteElem(userid, sku) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const collection = client.db('dbBot');
  const coll = collection.collection('users');
  const res = await coll.findOne({ userId: userid });
  let mas = [];
  for (let i = 0; i < res.products.length; i++) {
    if (res.products[i] != sku) {
      mas.push(res.products[i]);
    }
  }
  await coll.findOneAndUpdate({ userId }, { $set: { products: mas } });
  client.close();
};
