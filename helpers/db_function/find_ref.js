const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;

/// get Product
module.exports.refGet = async function refGet(userid, ref_user) {
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const collection = client.db('dbBot');
  const coll = collection.collection('usersRef');
  const res = await coll.findOne({ userId: ref_user });
  let mas = [];
  let temp = false;
  if (res != null) {
    for (let i = 0; i < res.human; i++) {
      if (res.human[i] != userid) {
        mas.push(res.human[i]);
        temp = true;
      } else {
        temp = false;
        client.close();
        return;
      }
    }
    if (temp) {
      let c = +res.count + 1;
      await mas.push(userid);
      await coll.findOneAndUpdate({ userId: ref_user }, { $set: { humans: mas, count: c } });
    }
  } else {
    return;
  }
  client.close();
};
