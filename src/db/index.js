const mongodb = require('mongodb');
const { mongoUrl, dbName } = require('../config/keys');

function makeIdFromString(id) {
  return new mongodb.ObjectID(id);
}

module.exports = async function () {
  const MongoClient = mongodb.MongoClient;
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  db.makeId = makeIdFromString;
  return db;
};
