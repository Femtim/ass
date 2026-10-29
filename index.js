require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require ('cors')

const userRouter = require('./routes/auth.route')

const port = process.env.PORT;
const DBURI = process.env.mongoDB_URI;


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/', userRouter );


mongoose
  .connect(DBURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  
app.listen(port, () => {
    console.log('i am working');
} )
