const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Routes
const userRoute = require('./routes/user');

app.use('/', userRoute);

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
mongoose
  .connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then((result) => {
    app.listen(PORT, () => { console.log(`Application is running on port ${PORT}`);
  });
  })
  .catch((error) => {console.log(error);
  });
