const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
module.exports.addUser = async function addUser(userid) {
  mongoClient.connect((err) => {
    if (err) {
      console.log(err);
    }
    const collection = mongoClient.db('dbBot');
    const addDbUsers = collection.collection('users');
    var template = {
      userid
    };

    addDbUsers.insertOne(template, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
};
module.exports.getUser = async function getUser(userid) {
  mongoClient.connect((err) => {
    if (err) {
      console.log(err);
    }
    const collection = mongoClient.db('dbBot');
    const getDbUsers = collection.collection('users');

    return getDbUsers.find({ userid });
  });
};
