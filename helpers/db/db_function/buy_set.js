const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
const today = new Date();

module.exports = async function favoritesSave(userId, skuid) {
  let dd = await String(today.getDate()).padStart(2, '0');
  let mm = await String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = await today.getFullYear();
  dataBuy = await (dd + '/' + mm + '/' + yyyy);
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
    client.close();
  }
  return 'bought';
};
