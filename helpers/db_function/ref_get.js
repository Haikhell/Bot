const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

/// get Product
module.exports.refGet = async function favoritesGet(userid) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const collection = client.db('dbBot');
  const coll = collection.collection('usersRef');
  const res = await coll.findOne({ userId: userid });
  if (res == null) {
    let activitiID = Math.floor(1000000 + Math.random() * 9000000);
    let ref = `ref=${activitiID}_${userid}`;
    temp = {
      userId: userid,
      ref,
      count: 0,
      humans: []
    };
    await coll.insertOne(temp);
    client.close();
    return ref;
  } else {
    await client.close();

    return res.ref;
  }
};
