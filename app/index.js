const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database'); //database initializations

//INITIALIZE APP WITH EXPRESS
const app = express();

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set proper Headers on Backend
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//ROUTES
app.use('/posts', require('./routes/posts')); //posts

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time
    );
    app.listen(process.env.EXTERNAL_PORT); //DEF in docker.compose.yml
  } catch (error) {
    console.log(error);
  }
})();