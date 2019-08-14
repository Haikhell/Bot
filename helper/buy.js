const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = async function favoritesSave(userId, skuid, dataBuy) {
  await client.connect();
  let products = [];
  let temp = false;
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
      if (res.products[i] == skuid) {
        temp = false;
        return 'This product in your favorite list';
      } else {
        temp = true;
        pr.push(res.products[i]);
      }
    }
  }
  if (temp) {
    pr.push(skuid);
    await addUsers.findOneAndUpdate({ userId }, { $set: { products: pr } });
    return 'Added';
  }
  client.close();
};
