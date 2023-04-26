const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log('Database created!');
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
