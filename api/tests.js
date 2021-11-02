const router = require('express').Router();
const { getDBReference } = require('../lib/mongo');

router.get('/', async (req, res) => {
  const db = getDBReference();
  const collection = db.collection('tests');
  const results = await collection.find({}).toArray();
  console.log(results);
  res.status(200).send(results);
});

module.exports = router;
