const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = require('./models');

const postRouter = require('./routes/posts.js');
app.use('/posts', postRouter);

const commentsRouter = require('./routes/comments.js');
app.use('/comments', commentsRouter);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log('Server running on port 8000');
  });
});
