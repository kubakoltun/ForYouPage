const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const url = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
// MongoClient.connect(url)
//     .then(client => {
//         console.log('Connected');
//         const db = client.db('foryoudb')
//         const postsCollection = db.collection('posts')
//     })

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
