const express = require("express")
const app = express();
const cors = require('cors');
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use(cors());

// mongodb 
require('./config/db')

// for accepting post form data
const bodyparser = require('express').json;
app.use(bodyparser());


const userRouter = require('./api/user')

// const bodyParser = require('body-parser');

app.use('/',userRouter)

app.use(express.json());




app.listen(port,() => {
    console.log(`server running on port ${port}`);
} )

