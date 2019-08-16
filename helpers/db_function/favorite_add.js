const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

module.exports = async function favoritesSave(userId, skuid) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });

  await client.connect();
  let temp = false;
  const collection = client.db('dbBot');
  const addUsers = collection.collection('users');
  let res = await addUsers.findOne({ userId });
  let pr = [];
  if (res == null) {
    temp = {
      userId,
      products: [ skuid ]
    };
    await addUsers.insertOne(temp);
    return 'Added';
  } else {
    if (res.products.length == 0) {
      temp = true;
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
  }
  if (temp) {
    pr.push(skuid);
    await addUsers.findOneAndUpdate({ userId }, { $set: { products: pr } });
    return 'Added';
  }
  await client.close();
};
