const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected'))
.catch((err)=> console.log(err));

//BodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/',require('./routes/user'));

app.listen(3000, ()=>{
  console.log(`Your server is up on port 3000`);
})
