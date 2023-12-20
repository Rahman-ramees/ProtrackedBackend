const express = require("express")
const app = express();

const port = 3000;

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



