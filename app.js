
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()  //selalu ditulis di awal app.js & di pakai tahap dev
}

const express = require('express');
const app = express();

const port = process.env.port || 3000;  // di app.js bukan router

app.use(express.urlencoded({ extended: true })); //false

app.use(express.json());  // body parser data json

// app.set('view engine', 'ejs');

app.use(require("./routes")); 

app.listen(port, () => {
  console.log(`Server can be accessed in http://localhost:${port}`)
})