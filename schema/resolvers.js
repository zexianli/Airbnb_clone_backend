const { ObjectId } = require('bson');
const { getDBReference } = require('../lib/mongo');

const resolvers = {
  Query: {
    hello: () => 'hello',
    // users: async () => {
    //   const db = getDBReference();
    //   const collection = db.collection('tests');
    //   const results = await collection.find({}).toArray();
    //   console.log(results);
    //   return results;
    // },
    lodging: async (parent, args) => {
      console.log(args.id);
      const db = getDBReference();
      const collection = db.collection('lodgings');
      const lodging = await collection.findOne({
        _id: new ObjectId(args.id),
      });
      console.log('Query lodging: ', lodging);
      return lodging;
    },
    lodgings: async () => {
      const db = getDBReference();
      const collection = db.collection('lodgings');
      const lodgings = await collection.find({}).toArray();
      return lodgings;
    },
  },
  Mutation: {
    createLodging: async (parent, args) => {
      const input = args.input;
      const db = getDBReference();
      const collection = db.collection('lodgings');
      const result = await collection.insertOne(input);
      const lodging = await collection.findOne({
        _id: new ObjectId(result.insertedId),
      });
      console.log('Create lodging:', lodging);
      return lodging;
    },
  },
};

module.exports = { resolvers };
