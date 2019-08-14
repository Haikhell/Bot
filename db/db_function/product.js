const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports.addProduct = async function addProduct(name, id, url) {
  MongoClient.connect((err) => {
    if (err) {
      console.log(err);
    }
    const collection = client.db('dbBot');
    const addDbProduct = collection.collection('products');

    let product = {
      userid: userid
    };
    addDbUsers.insertOne(user, function(err, exodus) {
      if (err) {
        console.log(err);
      }
    });
  });
};
module.exports.getUser = async function getUser(userid) {
  MongoClient.connect((err) => {
    if (err) {
      console.log(err);
    }
    const collection = client.db('dbBot');
    const getDbUsers = collection.collection('users');

    return getDbUsers.find({ userid });
  });
};
