const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const today = new Date();
const delF = require('../db_function/delete_favorites');

module.exports = async function favoritesSave(userId, skuid) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });

  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  dataBuy = dd + '/' + mm + '/' + yyyy;
  await client.connect();
  const collection = client.db('dbBot');
  const addUsers = collection.collection('userBuy');
  let res = await addUsers.findOne({ userId });
  let pr = [];
  if (res == null) {
    temp = {
      userId,
      products: [
        {
          skuid,
          data: dataBuy
        }
      ]
    };
    await addUsers.insertOne(temp);
  } else {
    for (let i = 0; i < res.products.length; i++) {
      pr.push(res.products[i]);
    }
    pr.push({
      skuid,
      data: dataBuy
    });
    await addUsers.findOneAndUpdate({ userId }, { $set: { products: pr } });
    await delF.delFavoriteElem(userId, skuid);
    client.close();
  }
  return 'bought';
};
